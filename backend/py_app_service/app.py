import asyncio
import traceback

from fastapi import FastAPI, Depends, HTTPException
from starlette.middleware.cors import CORSMiddleware

from py_app_service.config import SECRET_KEY, AZURE_SECURITY
from py_app_service.controllers import (
    AuthController,
    PaymentController,
    QuestController,
)
from py_app_service.controllers.my_tree import MyTree
from py_app_service.models import (
    AuthUser,
    AddQuestRequest,
    QuestModel,
    GPTAnalyticsRequest,
    ShareCarbonRevenue,
)
from py_app_service.utils import jwt_middleware
from typing import Literal

from py_app_service.workers.reward_nft import reward_nft
from py_app_service.workers.tree_nft import tree_nft

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",  # Allows all origins
    allow_credentials=True,
    allow_methods=[
        "PATCH",
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "HEAD",
    ],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.on_event("startup")
async def worker_runner():
    global worker_task
    worker_task = asyncio.create_task(tree_nft())
    print("Worker started")


@app.on_event("startup")
async def worker_runner():
    global worker_task2
    worker_task = asyncio.create_task(reward_nft())
    print("Worker started")


@app.get("/nonce/{address}")
async def get_nonce(address: str):
    try:
        result = await AuthController.get_nonce(address)
        return result
    except HTTPException as e:
        traceback.print_exc()
        raise e
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(500, str(e))


@app.post("/authenticate")
async def authenticate(auth_data: AuthUser):
    try:
        result = await AuthController.authenticate(auth_data)
        return result
    except HTTPException as e:
        traceback.print_exc()
        raise e
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(500, str(e))


@app.get("/test-middleware")
async def test_middleware(user=Depends(jwt_middleware)):
    return {"message": "this is yours", "data": user}


@app.get("/my-tree")
async def my_tree(user=Depends(jwt_middleware)):
    address = user["address"]
    data = await MyTree.get_my_tree_nft(address)
    return {"message": "this is yours t", "data": data}


@app.get("/my-awards")
async def my_tree(user=Depends(jwt_middleware)):
    address = user["address"]
    data = await MyTree.get_my_awardee(address)
    return {"message": "this is yours a", "data": data}


@app.get("/rank")
async def rank():
    data = await MyTree.get_rank()
    return {"message": "this is yours a", "data": data}


@app.get("/quests")
async def get_quests(
    order_by: Literal["title", "created_at", "updated_at"] = "created_at",
    order_direction: Literal["asc", "desc"] = "asc",
    search: str = "",
):
    try:
        result = await QuestController.get_quest_lists(
            order_by, order_direction, search
        )
        return result
    except HTTPException as e:
        traceback.print_exc()
        raise e
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(500, str(e))


@app.post("/quests")
async def add_quests(quest: AddQuestRequest):
    try:
        # parse security key
        if quest.security_key != SECRET_KEY:
            raise HTTPException(status_code=401, detail="Unauthorized")

        q_dict = quest.dict()
        # remove security_key
        q_dict.pop("security_key")

        quest = QuestModel(**q_dict)

        result = await QuestController.add_quests(quest)
        return result
    except HTTPException as e:
        traceback.print_exc()
        raise e
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(500, str(e))


@app.post("/payment-notification")
async def payment_notification(data: dict):
    try:
        # parse security key
        res = await PaymentController.coinbase_webhook(data)
        return res

    except HTTPException as e:
        traceback.print_exc()
        raise e
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(500, str(e))


@app.post("/analytics-green")
async def analytics_green(data: GPTAnalyticsRequest):
    try:
        # parse security key
        if data.security_key != AZURE_SECURITY:
            raise HTTPException(status_code=401, detail="Unauthorized")

        res = await PaymentController.carbon_credit_share_agent(data.yield_share)
        return res

    except HTTPException as e:
        traceback.print_exc()
        raise e
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(500, str(e))


@app.post("/carbon-revenue")
async def analytics_green(data: ShareCarbonRevenue):
    try:
        # parse security key
        if data.security_key != AZURE_SECURITY:
            raise HTTPException(status_code=401, detail="Unauthorized")

        res = await PaymentController.share_carbon_credit(data.persons)
        return res

    except HTTPException as e:
        traceback.print_exc()
        raise e
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(500, str(e))
