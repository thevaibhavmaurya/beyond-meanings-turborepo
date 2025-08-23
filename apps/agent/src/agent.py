import os
import sys
import json
from typing import List
from dotenv import load_dotenv
from portia import (
    Config,
    DefaultToolRegistry,
    LogLevel,
    PlanRunState,
    LLMProvider,
    Portia,
)
from portia.cli import CLIExecutionHooks
from pydantic import BaseModel, Field

from tools import (
    WikipediaTool,
    OxfordDictionaryTool,
    TMDBTool,
    TavilySearchTool,
    IGDBTool,
)

load_dotenv()


class TabContent(BaseModel):
    title: str = Field(..., description="Tab title")
    content: str = Field(..., description="Processed and formatted content for the tab")
    source: str = Field(..., description="Source of the information")


class MacLookupOutput(BaseModel):
    query: str = Field(..., description="Input word or phrase")
    tabs: List[TabContent] = Field(
        ..., description="List of tabs with organized information"
    )
    primary_summary: str = Field(..., description="Quick summary shown at the top")
    tools_used: List[str] = Field(..., description="List of tools that were called")


def run_agent(query: str) -> dict:
    openai_api_key = os.getenv("OPENAI_API_KEY")
    if not openai_api_key:
        raise ValueError("OPENAI_API_KEY environment variable is required.")

    config = Config.from_default(
        default_model="openai/gpt-4o-mini",
        default_log_level=LogLevel.INFO,
    )

    tools = DefaultToolRegistry(config) + [
        WikipediaTool(),
        OxfordDictionaryTool(),
        TMDBTool(),
        TavilySearchTool(),
        IGDBTool(),
    ]

    portia = Portia(
        config=config,
        tools=tools,
        execution_hooks=CLIExecutionHooks(),
    )

    plan_description = f"""
    Lookup comprehensive information about "{query}":
    
    1. Get Wikipedia information using Wikipedia_Tool
    2. Get current web information using Tavily_Search_Tool  
    3. If relevant, get movie/TV data using TMDB_Tool
    4. If relevant, get gaming data using IGDB_Tool
    5. If it's a single word, get definition using Oxford_Dictionary_Tool
    
    Organize results into tabs and create a summary.
    """

    plan = portia.plan(plan_description)
    run = portia.run_plan(
        plan,
        structured_output_schema=MacLookupOutput,
    )

    if run.state != PlanRunState.COMPLETE:
        raise Exception(f"Lookup failed with state {run.state}")

    result = MacLookupOutput.model_validate(run.outputs.final_output.value)

    # Return as dictionary for JSON serialization
    return result.model_dump()


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python agent.py <query> [research_id]")
        sys.exit(1)

    query = sys.argv[1]
    research_id = sys.argv[2] if len(sys.argv) > 2 else None

    try:
        result = run_agent(query, research_id)
        print(json.dumps(result, indent=2))
    except Exception as e:
        error_result = {"error": str(e), "query": query, "research_id": research_id}
        print(json.dumps(error_result, indent=2))
        sys.exit(1)
