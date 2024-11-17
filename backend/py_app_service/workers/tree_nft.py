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


async def tree_nft():
    while True:
        try:
            process_tree = (
                await mongo_instance["tree_transaction"]
                .find({"finished_at": None})
                .limit(3)
                .to_list(length=None)
            )

            print("we're going to mint nft -> ", len(process_tree))

            # mint nft
            web3 = Web3(Web3.HTTPProvider(NFT_CHAIN))

            nft = web3.eth.contract(
                address=Web3.to_checksum_address(NFT_CONTRACT_ADDRESS), abi=contract_abi
            )

            minter_address = Web3.to_checksum_address(NFT_ADMIN_ADDRESS)
            private_key = NFT_ADMIN_PK

            for tree in process_tree:
                tree_address = tree["address"]

                tree_amount = 1

                active_nft = (
                    await mongo_instance["tree_nft"]
                    .find({"finished_at": {"$ne": None}})
                    .to_list(length=None)
                )

                new_token_id = len(active_nft) + 1
                txn = nft.functions.createNFT(
                    Web3.to_checksum_address(tree_address)
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
                txn_hash = web3.eth.send_raw_transaction(signed_txn.raw_transaction)
                txn_receipt = web3.eth.wait_for_transaction_receipt(txn_hash)

                # save data in mongo
                await mongo_instance["tree_nft"].insert_one(
                    {
                        "address": tree_address.lower().strip(),
                        "token_id": new_token_id,
                        "amount": tree_amount,
                        "status": "ok",
                        "txHash": str(txn_receipt["transactionHash"]),
                        "created_at": datetime.now().timestamp(),
                        "updated_at": datetime.now().timestamp(),
                        "token_uri": f"https://polygon.blockscout.com/address/{NFT_CONTRACT_ADDRESS}",
                    }
                )
                print(f"Minted NFT with Token ID {new_token_id} to {tree_address}")

                # update status in table tree_transaction
                now = datetime.now().timestamp()
                ta = tree_address.lower().strip()

                tx_hash = txn_receipt["transactionHash"]
                # convert it to string
                tx_hash = web3.eth.get_transaction_receipt(tx_hash)

                await mongo_instance["tree_transaction"].update_many(
                    {"address": ta},
                    {
                        "$set": {
                            "finished_at": now,
                            "status": "ok",
                            "updated_at": now,
                            "txHash": tx_hash,
                            "token_id": new_token_id,
                        }
                    },
                )

        except Exception as e:
            traceback.print_exc()
            print("tree_nft woker err: ", e)
        finally:
            await asyncio.sleep(5)


def run_tree():
    asyncio.run(tree_nft())


if __name__ == "__main__":
    run_tree()
