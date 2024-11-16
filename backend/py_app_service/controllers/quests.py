from datetime import datetime

from fastapi import HTTPException
from pymongo.errors import PyMongoError

from py_app_service.database import mongo_instance
from py_app_service.models import QuestModel


class QuestController:
    @classmethod
    async def get_quest_lists(
        cls,
        order_by: str = "created_at",
        order_direction: str = "asc",
        search: str = "",
    ):
        if order_by not in ["title", "created_at", "updated_at"]:
            raise HTTPException(status_code=400, detail="Invalid order_by parameter.")

        if order_direction not in ["asc", "desc"]:
            raise HTTPException(
                status_code=400, detail="Invalid order_direction parameter."
            )

        query = {"show": True}

        if search and search != "":
            query["title"] = {"$regex": search, "$options": "i"}

        cursor = (
            mongo_instance["quests"].find(query).sort(order_by, int(order_direction))
        )

        quests = await cursor.to_list(length=None)

        result = []

        for q in quests:
            q["_id"] = str(q["_id"])
            result.append(q)
        return result

    @classmethod
    async def add_quests(cls, quest: QuestModel):
        now = datetime.now().timestamp()

        # Convert the QuestModel to a dictionary, excluding unset fields
        quest_data = quest.dict()

        # Remove the '_id' field if it exists, as MongoDB will generate it
        quest_data.pop("_id", None)

        # Set the created_at and updated_at timestamps
        quest_data["created_at"] = now
        quest_data["updated_at"] = now

        try:
            # Insert the quest into the 'quests' collection
            result = await mongo_instance["quests"].insert_one(quest_data)

            # Get the inserted ID and add it back to the quest data
            quest_data["_id"] = str(result.inserted_id)

            return quest_data

        except PyMongoError as e:
            # Handle any exceptions that occur during insertion
            raise HTTPException(status_code=500, detail=str(e))
