from fastapi import HTTPException
from py_app_service.database import mongo_instance
class PaymentController:
    def __init__(self):
        pass

    @classmethod
    async def coinbase_webhook(cls, data):
        product = data['event']['data']

        import json
        print(json.dumps(data))
        if product['checkout']['id'] !='3553037f-e4d4-4108-a6e4-f118e118f4f0':
            raise HTTPException(400, 'product is different')

        status = data['event']['type']
        address:str = data['metadata']['address']

        if not status or not data:
            raise HTTPException(400, 'incomplete data')

        if status == 'charge:confirmed':
            # find related address
            address = address.lower().strip()
            if address.startswith("0x"):
                address = address[2:]

            user = await mongo_instance["users"].find_one({
                "address": address
            })

            # create new instance for job processing
            await mongo_instance['tree_transaction']

        return data