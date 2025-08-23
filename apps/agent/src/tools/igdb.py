import os
import httpx
from pydantic import BaseModel, Field
from portia import (
    Tool,
    ToolRunContext,
)


class IGDBToolSchema(BaseModel):
    """Input for IGDBTool."""

    query: str = Field(..., description="Game title to search for")
    limit: int = Field(default=10, description="Maximum number of games to return")


class IGDBTool(Tool[str]):
    """Fetch IGDB game data as raw JSON string from REST API using httpx."""

    id: str = "IGDB_Tool"
    name: str = "IGDB Tool"
    description: str = (
        "Fetch IGDB game data as raw JSON string from REST API using httpx"
    )
    args_schema: type[BaseModel] = IGDBToolSchema
    output_schema: tuple[str, str] = (
        "str",
        "Raw IGDB JSON string returned from API",
    )

    def run(self, _: ToolRunContext, query: str, limit: int = 10) -> str:
        """Run the IGDBTool."""
        client_id = os.getenv("IGDB_CLIENT_ID")
        access_token = os.getenv("IGDB_ACCESS_TOKEN")

        if not client_id or not access_token:
            error_msg = "IGDB API credentials not configured"
            raw_json = f'{{"error": "{error_msg}", "query": "{query}", "games": []}}'
            return raw_json

        url = "https://api.igdb.com/v4/games"

        headers = {
            "Client-ID": client_id,
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
        }

        igdb_query = f"""
        search "{query}";
        fields id, name, summary, rating, rating_count, release_dates.date, 
               platforms.name, genres.name, cover.url, storyline, 
               involved_companies.company.name, involved_companies.developer;
        limit {limit};
        """

        try:
            with httpx.Client(timeout=15) as client:
                response = client.post(url, headers=headers, content=igdb_query)
                response.raise_for_status()
                raw_json = str(response.json())
        except Exception as e:
            error_msg = str(e).replace("{", "{{").replace("}", "}}")
            raw_json = f'{{"error": "No IGDB data found for {query}. Error: {error_msg}", "query": "{query}", "games": []}}'
        return raw_json
