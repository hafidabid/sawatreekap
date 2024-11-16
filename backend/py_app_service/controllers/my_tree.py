from py_app_service.database import mongo_instance

class MyTree:
    @classmethod
    async def get_my_tree_tx(cls, address: str):
        address = address.lower().strip()
        my_tree = await mongo_instance["tree_transaction"].find({"address": address}).to_list(length=None)

        res = []
        for tree in my_tree:
            tree["_id"] = str(tree["_id"])
            res.append(tree)

        return res
    @classmethod
    async def get_my_tree_nft(cls, address: str):
        address = address.lower().strip()
        my_tree = await mongo_instance["tree_nft"].find({"address": address}).to_list(length=None)

        res = []
        for tree in my_tree:
            tree["_id"] = str(tree["_id"])
            res.append(tree)