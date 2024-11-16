import traceback

from fastapi import FastAPI, Depends, HTTPException
from starlette.middleware.cors import CORSMiddleware

from py_app_service.config import SECRET_KEY
from py_app_service.controllers import AuthController
from py_app_service.controllers.quests import QuestController
from py_app_service.models import AuthUser, AddQuestRequest, QuestModel
from py_app_service.utils import jwt_middleware
from typing import Literal

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=[
        "PATCH",
        "GET",
        "POST",
        "PUT",
        "DELETE",
    ],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/nonce/{address}")
async def get_nonce(address: str):
    try:
        result = AuthController.get_nonce(address)
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
        result = AuthController.authenticate(auth_data)
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


@app.get("/quests")
async def get_quests(
    order_by: Literal["title", "created_at", "updated_at"] = "created_at",
    order_direction: Literal["asc", "desc"] = "asc",
    search: str = "",
):
    try:
        result = QuestController.get_quest_lists(order_by, order_direction, search)
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

        result = QuestController.add_quests(quest)
        return result
    except HTTPException as e:
        traceback.print_exc()
        raise e
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(500, str(e))
