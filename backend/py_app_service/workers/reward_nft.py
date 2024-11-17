import asyncio
import traceback
from datetime import datetime

from py_app_service.database import mongo_instance
from web3 import Web3
from py_app_service.config import (
    NFT_CHAIN,
    NFT_ADMIN_ADDRESS,
    NFT_ADMIN_PK,
    NFT_CONTRACT_ADDRESS,
)

contract_abi = [
    {
        "inputs": [
            {"internalType": "string", "name": "_name", "type": "string"},
            {"internalType": "string", "name": "_symbol", "type": "string"},
            {
                "internalType": "string",
                "name": "_baseTokenURI",
                "type": "string",
            },
        ],
        "stateMutability": "nonpayable",
        "type": "constructor",
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address",
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256",
            },
            {"internalType": "address", "name": "owner", "type": "address"},
        ],
        "name": "ERC721IncorrectOwner",
        "type": "error",
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address",
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256",
            },
        ],
        "name": "ERC721InsufficientApproval",
        "type": "error",
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "approver",
                "type": "address",
            }
        ],
        "name": "ERC721InvalidApprover",
        "type": "error",
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address",
            }
        ],
        "name": "ERC721InvalidOperator",
        "type": "error",
    },
    {
        "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
        "name": "ERC721InvalidOwner",
        "type": "error",
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address",
            }
        ],
        "name": "ERC721InvalidReceiver",
        "type": "error",
    },
    {
        "inputs": [{"internalType": "address", "name": "sender", "type": "address"}],
        "name": "ERC721InvalidSender",
        "type": "error",
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256",
            }
        ],
        "name": "ERC721NonexistentToken",
        "type": "error",
    },
    {
        "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
        "name": "OwnableInvalidOwner",
        "type": "error",
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address",
            }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error",
    },
    {
        "anonymous": False,
        "inputs": [
            {
                "indexed": True,
                "internalType": "address",
                "name": "owner",
                "type": "address",
            },
            {
                "indexed": True,
                "internalType": "address",
                "name": "approved",
                "type": "address",
            },
            {
                "indexed": True,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256",
            },
        ],
        "name": "Approval",
        "type": "event",
    },
    {
        "anonymous": False,
        "inputs": [
            {
                "indexed": True,
                "internalType": "address",
                "name": "owner",
                "type": "address",
            },
            {
                "indexed": True,
                "internalType": "address",
                "name": "operator",
                "type": "address",
            },
            {
                "indexed": False,
                "internalType": "bool",
                "name": "approved",
                "type": "bool",
            },
        ],
        "name": "ApprovalForAll",
        "type": "event",
    },
    {
        "anonymous": False,
        "inputs": [
            {
                "indexed": True,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address",
            },
            {
                "indexed": True,
                "internalType": "address",
                "name": "newOwner",
                "type": "address",
            },
        ],
        "name": "OwnershipTransferred",
        "type": "event",
    },
    {
        "anonymous": False,
        "inputs": [
            {
                "indexed": True,
                "internalType": "address",
                "name": "from",
                "type": "address",
            },
            {
                "indexed": True,
                "internalType": "address",
                "name": "to",
                "type": "address",
            },
            {
                "indexed": True,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256",
            },
        ],
        "name": "Transfer",
        "type": "event",
    },
    {
        "inputs": [
            {"internalType": "address", "name": "to", "type": "address"},
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256",
            },
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address",
            }
        ],
        "name": "createNFT",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256",
            }
        ],
        "name": "getApproved",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [
            {"internalType": "address", "name": "owner", "type": "address"},
            {
                "internalType": "address",
                "name": "operator",
                "type": "address",
            },
        ],
        "name": "isApprovedForAll",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256",
            }
        ],
        "name": "ownerOf",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {"internalType": "address", "name": "from", "type": "address"},
            {"internalType": "address", "name": "to", "type": "address"},
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256",
            },
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {"internalType": "address", "name": "from", "type": "address"},
            {"internalType": "address", "name": "to", "type": "address"},
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256",
            },
            {"internalType": "bytes", "name": "data", "type": "bytes"},
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address",
            },
            {"internalType": "bool", "name": "approved", "type": "bool"},
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_baseTokenURI",
                "type": "string",
            }
        ],
        "name": "setBaseURI",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4",
            }
        ],
        "name": "supportsInterface",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [],
        "name": "tokenCounter",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256",
            }
        ],
        "name": "tokenURI",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [
            {"internalType": "address", "name": "from", "type": "address"},
            {"internalType": "address", "name": "to", "type": "address"},
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256",
            },
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address",
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
]


async def reward_nft():
    while True:
        try:
            now = datetime.now().timestamp()
            quests = (
                await mongo_instance["quests"]
                .find({"show": True, "period_end": {"$gt": now}})
                .to_list(length=None)
            )

            print("hi bangkok")
            for quest in quests:
                try:
                    current_awardee = (
                        await mongo_instance["quest_awardee"]
                        .find({"quest_id": quest["_id"]})
                        .to_list(length=None)
                    )

                    current_awardee_address = [
                        awardee["address"] for awardee in current_awardee
                    ]

                    new_eligible = (
                        await mongo_instance["tree_transaction"]
                        .find({"address": {"$nin": current_awardee_address}})
                        .to_list(length=None)
                    )

                    # doing aggregation
                    process_tree = {}

                    for tree in new_eligible:
                        tree_address = tree["address"]
                        if tree_address in process_tree.keys():
                            process_tree[tree_address]["amount"] += 1
                        else:
                            process_tree[tree_address] = {
                                "address": tree_address,
                                "amount": 1,
                            }

                    list_eligible = []
                    for t, v in process_tree.items():
                        if v["amount"] >= quest["num_of_tree"]:
                            list_eligible.append(v["address"])

                    for eligible in list_eligible:
                        # mint nft
                        web3 = Web3(Web3.HTTPProvider(quest["nft_rpc_url"]))

                        nft = web3.eth.contract(
                            address=Web3.to_checksum_address(
                                quest["nft_contract_address"]
                            ),
                            abi=contract_abi,
                        )

                        minter_address = Web3.to_checksum_address(NFT_ADMIN_ADDRESS)
                        private_key = NFT_ADMIN_PK

                        txn = nft.functions.createNFT(
                            Web3.to_checksum_address(eligible)
                        ).build_transaction(
                            {
                                "chainId": 137,  # Rinkeby is 4
                                "gas": 200000,
                                "gasPrice": web3.to_wei("50", "gwei"),
                                "nonce": web3.eth.get_transaction_count(minter_address),
                            }
                        )
                        signed_txn = web3.eth.account.sign_transaction(
                            txn, private_key=private_key
                        )
                        txn_hash = web3.eth.send_raw_transaction(
                            signed_txn.raw_transaction
                        )
                        txn_receipt = web3.eth.wait_for_transaction_receipt(txn_hash)

                        # Save the reward data in mongodb
                        tx_hash = txn_receipt["transactionHash"]
                        # convert it to string
                        tx_hash = web3.eth.get_transaction_receipt(tx_hash)

                        await mongo_instance["quest_awardee"].insert_one(
                            {
                                "quest_id": quest["_id"],
                                "address": eligible,
                                "reward": "1 nft",
                                "created_at": datetime.now().timestamp(),
                                "tx_hash": tx_hash,
                            }
                        )

                except Exception as e:
                    traceback.print_exc()
                    print("reward_nft woker err: ", e)

        except Exception as e:
            traceback.print_exc()
            print("tree_nft woker err: ", e)
        finally:
            await asyncio.sleep(5)


def run_tree():
    asyncio.run(reward_nft())


if __name__ == "__main__":
    run_tree()
