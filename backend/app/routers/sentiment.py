import os
from datetime import date, datetime, timedelta

import httpx
from app.dependencies import sentiment
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/sentiment", tags=["sentiment"])


@router.get("/suggestions/")
async def get_suggestions():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{os.environ['BASE_API_URL']}/suggestions")
        if response.json()["status"] == "success":
            return response.json()["data"]
        else:
            raise HTTPException(status_code=400, detail=response.json()["type"])


@router.get("/{user_id}")
async def get_sentiment_score(user_id: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{os.environ['BASE_API_URL']}/api/v1/response/user/{user_id}")
        if response.json()["status"] == "success":
            tokens = response.json()["data"]
        else:
            raise HTTPException(status_code=400, detail=response.json()["type"])

    if tokens:
        batched_tokens = {date.today() - timedelta(days=i): [] for i in range(6, -1, -1)}
        for token in tokens:
            token_date = datetime.strptime(token["Date"], "%Y-%m-%dT%H:%M:%SZ").date()
            batched_tokens[token_date].append(token["Data"])
        batched_sentiment = {
            i: await sentiment.get_sentiment(tokens)
            for i, tokens in enumerate(batched_tokens.values())
        }
        sentiment_response = [{"x": k, "y": v} for k, v in batched_sentiment.items()]
        return sentiment_response


@router.get("/{emoji}")
async def get_emoji_sentiment(emoji: str):
    return sentiment.emoji_sentiments[emoji]
