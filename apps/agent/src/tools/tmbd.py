import os
import httpx
from pydantic import BaseModel, Field
from portia import (
    Tool,
    ToolRunContext,
)


class TMDBToolSchema(BaseModel):
    """Input for TMDBTool."""

    query: str = Field(..., description="Movie or TV show title to search for")
    search_type: str = Field(
        default="movie", description="Type of content to search for: 'movie' or 'tv'"
    )


class TMDBTool(Tool[str]):
    """Fetch TMDB movie/TV show data as raw JSON string from REST API using httpx."""

    id: str = "TMDB_Tool"
    name: str = "TMDB Tool"
    description: str = (
        "Fetch TMDB movie/TV show data as raw JSON string from REST API using httpx"
    )
    args_schema: type[BaseModel] = TMDBToolSchema
    output_schema: tuple[str, str] = (
        "str",
        "Raw TMDB JSON string returned from API",
    )

    def run(self, _: ToolRunContext, query: str, search_type: str = "movie") -> str:
        """Run the TMDBTool."""
        api_key = os.getenv("TMDB_API_KEY")

        if not api_key:
            error_msg = "TMDB API key not configured"
            raw_json = f'{{"error": "{error_msg}", "query": "{query}", "results": []}}'
            return raw_json

        if search_type not in ["movie", "tv"]:
            search_type = "movie"

        url = f"https://api.themoviedb.org/3/search/{search_type}"
        params = {"api_key": api_key, "query": query, "language": "en-US", "page": 1}

        try:
            with httpx.Client(timeout=10) as client:
                response = client.get(url, params=params)
                response.raise_for_status()
                raw_json = str(response.json())
        except Exception as e:
            error_msg = str(e).replace("{", "{{").replace("}", "}}")
            raw_json = f'{{"error": "No TMDB data found for {query}. Error: {error_msg}", "query": "{query}", "results": []}}'
        return raw_json
