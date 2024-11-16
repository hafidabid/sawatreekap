from pydantic import BaseModel
from typing import Optional, Union, List


class UserModel(BaseModel):
    _id: Optional[str] = None
    nonce: str
    address: str
    email: Optional[str] = None
    phone_number: Optional[str] = None
    nickname: Optional[str] = None
    created_at: Optional[Union[int, float]] = None
    updated_at: Optional[Union[int, float]] = None


class QuestModel(BaseModel):
    _id: Optional[str] = None
    title: str
    description: str
    created_at: Optional[Union[int, float]] = None
    updated_at: Optional[Union[int, float]] = None
    show: bool = True
    period_start: Union[int, float]
    period_end: Union[int, float]
    tracking_start: Union[int, float]
    tracking_end: Union[int, float]
    num_of_tree: int
    total_of_valuation: Union[int, float]
    total_of_tokens: Union[int, float]
    limit_of_award: int
    nft_contract_address: Optional[str] = None
    nft_chain: Optional[str] = None
    nft_rpc_url: Optional[str] = None
    nft_token_id: Optional[str] = None
    image_assets: Optional[str] = None


class AddQuestRequest(QuestModel):
    security_key: str


class AuthUser(BaseModel):
    signature: str
    address: str


class ImageStorageModel(BaseModel):
    _id: Optional[str] = None
    image_url: str
    ipfs: str
    created_at: Optional[Union[int, float]] = None
    updated_at: Optional[Union[int, float]] = None
    tx_hash: str


class GPTAnalyticsRequest(BaseModel):
    yield_share: float
    security_key: str


class CarbonRevPerson(BaseModel):
    address: str
    amount: float


class ShareCarbonRevenue(BaseModel):
    security_key: str
    persons: List[CarbonRevPerson]
