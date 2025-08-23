import httpx
from pydantic import BaseModel, Field
from portia import (
    Tool,
    ToolRunContext,
)


class WikipediaToolSchema(BaseModel):
    """Input for WikipediaTool."""

    query: str = Field(..., description="Search query for Wikipedia")


class WikipediaTool(Tool[str]):
    """Fetch Wikipedia summary as raw JSON string from REST API using httpx."""

    id: str = "Wikipedia_Tool"
    name: str = "Wikipedia Tool"
    description: str = (
        "Fetch Wikipedia summary as raw JSON string from REST API using httpx"
    )
    args_schema: type[BaseModel] = WikipediaToolSchema
    output_schema: tuple[str, str] = (
        "str",
        "Raw Wikipedia summary JSON string returned from API",
    )

    def run(self, _: ToolRunContext, query: str) -> str:
        """Run the WikipediaTool."""
        url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{query.replace(' ', '_')}"
        try:
            with httpx.Client(timeout=10) as client:
                response = client.get(url)
                response.raise_for_status()
                raw_json = str(response.json())
        except Exception as e:
            error_msg = str(e).replace("{", "{{").replace("}", "}}")
            raw_json = f'{{"title": "Not Found", "extract": "No Wikipedia page found for {query}. Error: {error_msg}", "content_urls": {{}}}}'
        return raw_json
