from py_app_service.database import mongo_instance


class MyTree:
    @classmethod
    async def get_my_tree_tx(cls, address: str):
        address = address.lower().strip()
        my_tree = (
            await mongo_instance["tree_transaction"]
            .find({"address": address})
            .to_list(length=None)
        )

        res = []
        for tree in my_tree:
            tree["_id"] = str(tree["_id"])
            res.append(tree)

        return res

    @classmethod
    async def get_my_tree_nft(cls, address: str):
        address = address.lower().strip()
        my_tree = (
            await mongo_instance["tree_nft"]
            .find({"address": address})
            .to_list(length=None)
        )

        res = []
        for tree in my_tree:
            tree["_id"] = str(tree["_id"])
            res.append(tree)

        return res

    @classmethod
    async def get_my_awardee(cls, address: str):
        address = address.lower().strip()
        my_award = (
            await mongo_instance["quest_awardee"]
            .find({"address": address})
            .to_list(length=None)
        )

        res = []
        for tree in my_award:
            tree["_id"] = str(tree["_id"])
            tree["quest"] = await mongo_instance["quests"].find_one(
                {"_id": tree["quest_id"]}
            )
            tree["quest"]["_id"] = str(tree["quest"]["_id"])
            res.append(tree)

        return res

    @classmethod
    async def get_rank(cls):
        tree_tx = await mongo_instance["tree_transaction"].find().to_list(length=None)
        user = await mongo_instance["users"].find().to_list(length=None)

        temp = {}

        for tree in tree_tx:
            address = tree["address"]
            if address in temp.keys():
                temp[address] += 1
            else:
                temp[address] = 1

        for user in user:
            address = user["address"]
            if address not in temp.keys():
                temp[address] = 0

        res = []
        for address in temp.keys():
            res.append({"address": address, "amount": temp[address]})

        res.sort(key=lambda x: x["amount"], reverse=True)

        for i in range(len(res)):
            res[i]["rank"] = i + 1

        return res
