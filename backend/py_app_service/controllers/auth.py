import secrets

import jwt
from fastapi import HTTPException
from web3 import Web3, HTTPProvider

from py_app_service.database import mongo_instance
from py_app_service.models import UserModel, AuthUser
from datetime import datetime, timedelta
from py_app_service.config import SECRET_KEY, WEB3_RPC
from eth_account.messages import encode_defunct
from hexbytes import HexBytes


class AuthController:

    @classmethod
    async def get_nonce(cls, address: str):
        nonce = secrets.token_hex(16)

        now = datetime.now().timestamp()
        address = address.lower().strip()

        # check for 0x
        if address.startswith("0x"):
            address = address[2:]

        # search user with similar address
        user = await mongo_instance["users"].find_one({"address": address})
        if user:
            await mongo_instance["users"].update_one(
                {"address": address}, {"$set": {"nonce": nonce, "updated_at": now}}
            )
        else:
            new_user_model = UserModel(
                nonce=nonce, address=address, created_at=now, updated_at=now
            )

            await mongo_instance["users"].insert_one(new_user_model.dict())

        return {"message": "success generate nonce", "data": {"nonce": nonce}}

    @classmethod
    async def authenticate(cls, auth_data: AuthUser):
        address = auth_data.address.lower().strip()
        signature = auth_data.signature

        # check for 0x
        if address.startswith("0x"):
            address = address[2:]

        # get user data from database

        user = await mongo_instance["users"].find_one({"address": address})
        print("debug get user", user)
        if not user:
            raise HTTPException(status_code=404, detail="User not found.")

        nonce = user["nonce"]

        if not nonce:
            raise HTTPException(status_code=400, detail="Nonce not found or expired.")

        message = f"Authenticate with nonce: {nonce}"
        web3 = Web3(HTTPProvider(""))
        message_hash = encode_defunct(text=message)
        hexed_signature = HexBytes(signature)
        recovered_address = web3.eth.account.recover_message(
            message_hash, signature=hexed_signature
        )

        recovered_address = recovered_address.lower().strip()
        if recovered_address.startswith("0x"):
            recovered_address = recovered_address[2:]

        if recovered_address.lower() != address:
            raise HTTPException(status_code=401, detail="Invalid signature.")

        # Generate JWT token
        token = jwt.encode(
            {
                "address": address,
                "exp": datetime.utcnow() + timedelta(hours=3),
                "uid": str(user["_id"]),
            },
            SECRET_KEY,
            algorithm="HS256",
        )

        return {"message": "success authorization", "data": {"token": token}}
