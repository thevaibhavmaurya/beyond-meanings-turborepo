import os
import json
import asyncio
import httpx
from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv
from agent import run_agent

load_dotenv()

app = FastAPI(title="Research Agent API", version="1.0.0")


class AgentRequest(BaseModel):
    query: str
    research_id: str


class AgentResponse(BaseModel):
    success: bool
    message: str
    research_id: str


async def update_research_in_database(research_id: str, content: dict, status: str):
    """Update research result in the NestJS database via API call"""
    try:
        nestjs_api_url = os.getenv("NESTJS_API_URL", "http://localhost:3000/api")

        print(f"🔄 Updating research {research_id} with status {status}")
        print(f"📡 Calling: {nestjs_api_url}/research/update")

        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{nestjs_api_url}/research/update",
                json={"research_id": research_id, "content": content, "status": status},
                timeout=30.0,
            )

            print(f"📊 Response status: {response.status_code}")

            if response.status_code == 200:
                print(f"✅ Successfully updated research {research_id}")
            else:
                response_text = response.text
                print(f"❌ Failed to update research {research_id}")
                print(f"   Status: {response.status_code}")
                print(f"   Response: {response_text}")

    except Exception as e:
        print(f"💥 Error updating research {research_id}: {e}")
        import traceback

        traceback.print_exc()


async def process_agent_request(query: str, research_id: str):
    """Process the agent request in the background"""
    try:
        print(f"Processing research {research_id} for query: {query}")

        # Run the agent
        result = run_agent(query)  # Uncomment when ready to use real agent
        # Update database with success
        await update_research_in_database(research_id, result, "COMPLETED")

        print(f"Successfully completed research {research_id}")

    except Exception as e:
        print(f"Error processing research {research_id}: {e}")

        # Update database with failure
        error_content = {"error": str(e), "query": query, "research_id": research_id}
        await update_research_in_database(research_id, error_content, "FAILED")


@app.post("/agent/lookup", response_model=AgentResponse)
async def lookup(request: AgentRequest, background_tasks: BackgroundTasks):
    """
    Handle lookup request from NestJS backend
    Accepts query and research_id, processes asynchronously
    """
    try:
        # Add the agent processing to background tasks
        background_tasks.add_task(
            process_agent_request, request.query, request.research_id
        )

        return AgentResponse(
            success=True,
            message="Research processing initiated",
            research_id=request.research_id,
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "research-agent-api"}


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Research Agent API",
        "version": "1.0.0",
        "endpoints": {"lookup": "POST /agent/lookup", "health": "GET /health"},
    }


if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", "5000"))
    host = os.getenv("HOST", "0.0.0.0")

    print(f"Starting Research Agent API on {host}:{port}")
    uvicorn.run(app, host=host, port=port)
