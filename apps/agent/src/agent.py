import os
import sys
from typing import List
from dotenv import load_dotenv
from portia import (
    Config,
    DefaultToolRegistry,
    LogLevel,
    PlanRunState,
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
    """Represents content for a single tab."""

    title: str = Field(
        ..., description="Tab title (e.g., 'Wikipedia', 'Movies', 'Definition')"
    )
    content: str = Field(..., description="Processed and formatted content for the tab")
    source: str = Field(
        ..., description="Source of the information (e.g., 'Wikipedia API', 'TMDB')"
    )


class MacLookupOutput(BaseModel):
    """Output schema for Mac Lookup-style agent."""

    query: str = Field(..., description="Input word or phrase")
    tabs: List[TabContent] = Field(
        ..., description="List of tabs with organized information"
    )
    primary_summary: str = Field(..., description="Quick summary shown at the top")
    tools_used: List[str] = Field(..., description="List of tools that were called")


def run_agent(query: str = None) -> MacLookupOutput:
    """Run the Mac Lookup-style agent."""

    if not query:
        query = input("🔍 Enter a word or phrase to lookup: ")

    print(f"\n🔍 Looking up: '{query}'")

    openai_api_key = os.getenv("OPENAI_API_KEY")
    if not openai_api_key:
        print("❌ OPENAI_API_KEY is not properly configured!")
        print("🔧 Get your API key from: https://platform.openai.com/")
        print("💡 Set OPENAI_API_KEY=your_actual_key in your .env file")
        raise ValueError("OPENAI_API_KEY environment variable is required.")

    config = Config.from_default(
        default_model="openai/gpt-4o",
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

    print("🧠 Analyzing query and generating lookup plan...")

    plan = portia.plan(plan_description)

    print("\n📋 Lookup Strategy:")
    print(plan.pretty_print())

    print("\n⚡ Gathering information...")
    run = portia.run_plan(
        plan,
        structured_output_schema=MacLookupOutput,
    )

    if run.state != PlanRunState.COMPLETE:
        raise Exception(
            f"Lookup failed with state {run.state}. Check logs for details."
        )

    result = MacLookupOutput.model_validate(run.outputs.final_output.value)

    return result


# def display_lookup_results(result: MacLookupOutput):
#     """Display results in Mac Lookup style."""

#     print("\n" + "=" * 80)
#     print(f"🔍 LOOKUP: {result.query}")
#     print("=" * 80)

#     # Primary summary (like Mac Lookup's top section)
#     print(f"\n📊 QUICK OVERVIEW")
#     print("-" * 40)
#     print(result.primary_summary)

#     # Display tabs
#     print(f"\n📑 DETAILED INFORMATION ({len(result.tabs)} tabs)")
#     print("=" * 60)

#     for i, tab in enumerate(result.tabs, 1):
#         print(f"\n[TAB {i}] {tab.title.upper()}")
#         print(f"Source: {tab.source}")
#         print("-" * 50)
#         print(tab.content)

#         if i < len(result.tabs):
#             print("\n" + "•" * 50)

#     # Footer info
#     print(f"\n🛠️  Tools Used: {', '.join(result.tools_used)}")
#     print("=" * 80)


# def interactive_mode():
#     """Run in interactive mode like Mac Lookup."""

#     print("🍎 Mac Lookup-Style Information Agent")
#     print("=====================================")
#     print("💡 Type any word or phrase to get comprehensive information")
#     print("💡 Type 'quit' or 'exit' to stop")
#     print()

#     while True:
#         try:
#             query = input("\n🔍 Lookup: ").strip()

#             if query.lower() in ["quit", "exit", "q"]:
#                 print("👋 Goodbye!")
#                 break

#             if not query:
#                 continue

#             # Run lookup
#             run_agent(query)

#         except KeyboardInterrupt:
#             print("\n👋 Goodbye!")
#             break
#         except Exception as e:
#             print(f"\n❌ Error during lookup: {e}")
#             print("🔄 Try again with a different query")


# if __name__ == "__main__":
#     try:
#         # Check if query provided as argument
#         if len(sys.argv) > 1:
#             query = " ".join(sys.argv[1:])
#             run_agent(query)
#         else:
#             # Run in interactive mode
#             interactive_mode()

#     except KeyboardInterrupt:
#         print("\n\n👋 Operation cancelled.")
#     except Exception as e:
#         print(f"\n❌ Error: {e}")
#         sys.exit(1)
