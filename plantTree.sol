// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract plantTree is IERC721Receiver, Ownable{
    IERC20 public token;
    address public tokenAddress;
    address public nftAddress;
    mapping(uint => Stake) staking;

     struct Stake {
        address owner;
        uint256 tokenId;
        uint256 stakedAt;
        uint balance;
        bool isStaking;
    }

    event Staked(address indexed owner, uint256 tokenId, uint256 timestamp);
    event Unstaked(address indexed owner, uint256 tokenId, uint256 timestamp);


    function receiveTokens(address _tokenAddress, uint256 _amount) external {
        require(IERC20(_tokenAddress).transferFrom(msg.sender, address(this), _amount), "Transfer failed");
    }

    constructor(address _tokenAddress) Ownable(address(this)){
         token = IERC20(_tokenAddress);
    }

    function deposit(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");

        // Transfer tokens from the user to this contract
        bool success = token.transferFrom(msg.sender, address(this), amount);
        require(success, "Token transfer failed");
    }

    function checkBalance(address _tokenAddress) public view returns(uint){
        return IERC20(_tokenAddress).balanceOf(address(this));
    }

    function checkBalanceNFT(address _tokenAddress) public view returns(uint){
        return IERC721(_tokenAddress).balanceOf(address(this));
    }



    function transferERC20(address _tokenAddress, address _recipient, uint256 _amount) public {
        require(IERC20(_tokenAddress).balanceOf(address(this)) >= _amount, "Insufficient token balance");
        
        bool success = IERC20(_tokenAddress).transfer(_recipient, _amount);
        require(success, "Transfer failed");
    }

    function transferERC721(address _nftAddress, address _recipient, uint256 _tokenId) external {
        require(IERC721(_nftAddress).ownerOf(_tokenId) == address(this), "Contract does not own this NFT");

        IERC721(_nftAddress).safeTransferFrom(address(this), _recipient, _tokenId);
    }

    function transferToStaking(uint _tokenId) external{
        require(staking[_tokenId].owner == msg.sender, "you're not the owner");
        require(!staking[_tokenId].isStaking, "Token is already staked");
        staking[_tokenId].isStaking = true;
        staking[_tokenId].stakedAt = block.timestamp;
     }

      function withdrawFromStaking(uint _tokenId) external{
        require(staking[_tokenId].owner == msg.sender, "you're not the owner");
        require(staking[_tokenId].isStaking, "Token is already staked");
        staking[_tokenId].isStaking = false;
        uint reward = (block.timestamp - staking[_tokenId].stakedAt)/12000;
        if(reward > 1){
            staking[_tokenId].balance += reward;
        }
     }

        function withdrawCarbonToken(uint _tokenId, uint amount) public{
            require(staking[_tokenId].owner == msg.sender, "Token is not yours");
            require(staking[_tokenId].balance > 0 , "You don't have any carbon tokens");
            require(amount <= staking[_tokenId].balance, "Insufficient");
            staking[_tokenId].balance -= amount;
             transferERC20(address(this), staking[_tokenId].owner, amount);

        }
    
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external pure override returns (bytes4) {
        // Custom logic to handle the received NFT
        return this.onERC721Received.selector;
    }
}