// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract NFTree is ERC721, Ownable {
    uint256 public tokenCounter;
    string private baseTokenURI;

    // Constructor to initialize the NFT collection
    constructor(string memory _name, string memory _symbol, string memory _baseTokenURI) 
        ERC721(_name, _symbol) 
        Ownable(msg.sender)  // Set initial owner as msg.sender
    {
        tokenCounter = 0;
        baseTokenURI = _baseTokenURI;
    }

    // Function to mint a new NFT, only accessible by the contract owner
    function createNFT(address recipient) public onlyOwner returns (uint256) {
        uint256 newItemId = tokenCounter;
        _safeMint(recipient, newItemId); // Minting the new token
        tokenCounter += 1;
        return newItemId;
    }

    // Function to update the base URI, only accessible by the contract owner
    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    // Internal function to override the base URI for the contract
    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    
}