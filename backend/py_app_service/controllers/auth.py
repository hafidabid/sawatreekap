import secrets

import jwt
from fastapi import HTTPException
from web3 import Web3, HTTPProvider

from py_app_service.database import mongo_instance
from py_app_service.models import UserModel, AuthUser
from datetime import datetime, timedelta
from py_app_service.config import SECRET_KEY, WEB3_RPC


class AuthController:

    @classmethod
    async def get_nonce(cls, address: str):
        nonce = secrets.token_hex(16)

        now = datetime.now().timestamp()

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
        address = auth_data.address.lower()
        signature = auth_data.signature

        # get user data from database

        user = await mongo_instance["users"].find_one({"address": address})
        if not user:
            raise HTTPException(status_code=404, detail="User not found.")

        nonce = user["nonce"]

        if not nonce:
            raise HTTPException(status_code=400, detail="Nonce not found or expired.")

        message = f"Authenticate with nonce: {nonce}"
        web3 = Web3(HTTPProvider(WEB3_RPC))
        message_hash = Web3.solidity_keccak(text=message)
        recovered_address = web3.eth.account.recoverHash(
            message_hash, signature=signature
        )

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
