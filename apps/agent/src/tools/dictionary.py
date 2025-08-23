import os
import httpx
from pydantic import BaseModel, Field
from portia import (
    Tool,
    ToolRunContext,
)


class OxfordDictionaryToolSchema(BaseModel):
    """Input for OxfordDictionaryTool."""

    word: str = Field(..., description="Word to look up in Oxford Dictionary")


class OxfordDictionaryTool(Tool[str]):
    """Fetch Oxford Dictionary definition as raw JSON string from REST API using httpx."""

    id: str = "Oxford_Dictionary_Tool"
    name: str = "Oxford Dictionary Tool"
    description: str = "Fetch Oxford Dictionary definition as raw JSON string from REST API using httpx"
    args_schema: type[BaseModel] = OxfordDictionaryToolSchema
    output_schema: tuple[str, str] = (
        "str",
        "Raw Oxford Dictionary JSON string returned from API",
    )

    def run(self, _: ToolRunContext, word: str) -> str:
        """Run the OxfordDictionaryTool."""
        app_id = os.getenv("OXFORD_APP_ID")
        app_key = os.getenv("OXFORD_APP_KEY")

        if not app_id or not app_key:
            error_msg = "Oxford Dictionary API credentials not configured"
            raw_json = (
                f'{{"error": "{error_msg}", "word": "{word}", "definitions": []}}'
            )
            return raw_json

        url = (
            f"https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/{word.lower()}"
        )
        headers = {"app_id": app_id, "app_key": app_key}

        try:
            with httpx.Client(timeout=10) as client:
                response = client.get(url, headers=headers)
                response.raise_for_status()
                raw_json = str(response.json())
        except Exception as e:
            error_msg = str(e).replace("{", "{{").replace("}", "}}")
            raw_json = f'{{"error": "No Oxford Dictionary entry found for {word}. Error: {error_msg}", "word": "{word}", "definitions": []}}'
        return raw_json
