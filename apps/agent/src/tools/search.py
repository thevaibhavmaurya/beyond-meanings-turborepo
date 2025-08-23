import httpx
from pydantic import BaseModel, Field
from portia import (
    Tool,
    ToolRunContext,
)
import os


class TavilySearchToolSchema(BaseModel):
    """Input for TavilySearchTool."""

    query: str = Field(..., description="Search query for Tavily")
    max_results: int = Field(
        default=5, description="Maximum number of results to return"
    )
    search_depth: str = Field(
        default="basic", description="Search depth: 'basic' or 'advanced'"
    )


class TavilySearchTool(Tool[str]):
    """Fetch Tavily search results as raw JSON string from REST API using httpx."""

    id: str = "Tavily_Search_Tool"
    name: str = "Tavily Search Tool"
    description: str = (
        "Fetch Tavily search results as raw JSON string from REST API using httpx"
    )
    args_schema: type[BaseModel] = TavilySearchToolSchema
    output_schema: tuple[str, str] = (
        "str",
        "Raw Tavily search results JSON string returned from API",
    )

    def run(
        self,
        _: ToolRunContext,
        query: str,
        max_results: int = 5,
        search_depth: str = "basic",
    ) -> str:
        """Run the TavilySearchTool."""
        api_key = os.getenv("TAVILY_API_KEY")

        if not api_key:
            error_msg = "Tavily API key not configured"
            raw_json = f'{{"error": "{error_msg}", "query": "{query}", "results": []}}'
            return raw_json

        url = "https://api.tavily.com/search"

        payload = {
            "api_key": api_key,
            "query": query,
            "max_results": max_results,
            "search_depth": search_depth,
            "include_answer": True,
            "include_raw_content": False,
            "include_images": False,
        }

        try:
            with httpx.Client(timeout=15) as client:
                response = client.post(url, json=payload)
                response.raise_for_status()
                raw_json = str(response.json())
        except Exception as e:
            error_msg = str(e).replace("{", "{{").replace("}", "}}")
            raw_json = f'{{"error": "No Tavily search results found for {query}. Error: {error_msg}", "query": "{query}", "results": []}}'
        return raw_json
