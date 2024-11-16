import json
from datetime import datetime

from fastapi import HTTPException
from py_app_service.database import mongo_instance
from py_app_service.utils.gpt_util import create_chat_completion
from py_app_service.config import AZURE_AI_KEY, AZURE_ENDPOINT


class PaymentController:
    def __init__(self):
        pass

    @classmethod
    async def coinbase_webhook(cls, data):
        product = data["event"]["data"]

        if product["checkout"]["id"] != "3553037f-e4d4-4108-a6e4-f118e118f4f0":
            raise HTTPException(400, "product is different")

        status = data["event"]["type"]
        address: str = product["metadata"]["address"]

        if not status or not data:
            raise HTTPException(400, "incomplete data")

        if status == "charge:confirmed":
            # find related address
            address = address.lower().strip()
            if address.startswith("0x"):
                address = address[2:]

            user = await mongo_instance["users"].find_one({"address": address})

            uid = None
            if user:
                uid = user["_id"]

            # create new instance for job processing
            now = datetime.now().timestamp()
            await mongo_instance["tree_transaction"].insert_one(
                {
                    "address": address,
                    "amount": 1,
                    "status": status,
                    "created_at": now,
                    "updated_at": now,
                    "finished_at": None,
                    "user_id": uid,
                }
            )

        return data

    @classmethod
    async def carbon_credit_share_agent(cls, yield_carbon: float):
        tree_data = await mongo_instance["tree_transaction"].find({"user_id": {"$ne": None}}).to_list(length=None)

        mapper = {}

        for tree in tree_data:
            address = tree["address"]
            if address in mapper.keys():
                mapper[address] += 1
            else:
                mapper[address] = 1

        # convert it into tabulation
        user_tree = []

        for address in mapper.keys():
            user_tree.append({"address": address, "amount": mapper[address]})

        # prompting to gpt and return back in format of
        # {
        #     "address": address,
        #     "carbon_amount": number,
        #     "tree_amount": number
        #     "token_amount": number
        # "impact_meter": number
        # "message":str
        # }
        system_prompt = (
            "hi i have plantation plant with user  i need to share my carbon credit with user and ",
            "appreciate them and give them more awareness to contribute to the greening of our planet, here is the tree that ",
            "have planted by user (representated by crypto address). Here is the users with their plantations in this past semester:\n{}\n. ".format(
                str(
                    [
                        "address: {} has {} trees".format(tree["address"], tree["amount"])
                        for tree in user_tree
                    ]
                )
            ),
            "I want you to become an agent that can calculate the carbon, then divide the token based on the yield that user has specified ",
            'to you, also giving impact meter in number and message to user. the output should be in array of JSON, like this:\n\n[{"address": address, ',
            '"carbon_amount": number, "tree_amount": number, "token_amount": number, "impact_meter": number, "message":str}]\n\n',
            'If user has no carbon credit, return [{"address": address, "carbon_amount": 0, "tree_amount": 0, "token_amount": 0, "impact_meter": 0, ',
            '"message":str}]\n\n Please make the output only in array JSON format without any additional text'
        )

        system_prompt = ' '.join(system_prompt)
        user_prompt = "we have yield of {} to share with user".format(yield_carbon)
        memory_gpt = [
            {"role": "system", "content": system_prompt}
        ]

        print(user_prompt)
        print()
        print(memory_gpt)

        _, result_gpt = create_chat_completion(
            messages=user_prompt,
            model="gpt-4o",
            memory=memory_gpt,
            temperature=0.6,
            azure_endpoint=AZURE_ENDPOINT,
            openai_api_key=AZURE_AI_KEY[0],
        )

        # parse and purify and tidy the result into json
        try:
            result = result_gpt.strip()
            first_index = result.find("{")
            last_index = result.rfind("}")
            result = result[first_index: last_index + 1]
            result = json.loads(result)
            return {
                "message": "success get ai analytics",
                "data": result
            }
        except Exception as e:
            print('ai parsing err: ', e)
            return {
                "message": "success get ai analytics",
                "data": result_gpt
            }

    @classmethod
    async def share_carbon_credit(cls, data):
        pass
