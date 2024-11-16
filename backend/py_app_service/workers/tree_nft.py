import asyncio
from py_app_service.database import mongo_instance
from cdp import Cdp


async def tree_nft():
    while True:
        try:
            process_tree = (
                await mongo_instance["tree_transaction"]
                .find({"finished_at": None})
                .limit(3)
            )

            # mint nft using CDP SDK

        except Exception as e:
            print("tree_nft woker err: ", e)
        finally:
            await asyncio.sleep(5)


def run_tree():
    asyncio.run(tree_nft())
