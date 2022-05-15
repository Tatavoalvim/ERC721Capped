// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721Capped is ERC721, Ownable {

    uint64 _totalMinted;
    bool _isMintable;
    uint256 _mintPrice;
    uint64 _cap;

    constructor(string memory name_, string memory symbol_, uint64 cap) ERC721 (name_, symbol_) {
        _cap = cap;
    }


        
    function getTotalSupply() public view returns (uint64) {
        return _totalMinted;
    }
    
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function _createNFT() internal {
        require(_totalMinted < _cap);
        _totalMinted++;

    }

    function ownerMint() public onlyOwner {
        _createNFT();
    }

    function publicMint() public payable {
        require(_isMintable && msg.value == _mintPrice);
        _createNFT();
    }

    function setMintPrice(uint256 mintPrice) public onlyOwner {
        _mintPrice = mintPrice;
    }

    function openSales(uint256 mintPrice) public onlyOwner {
        _isMintable = true;
        setMintPrice(mintPrice);
    }

    function closeSales() public onlyOwner {
        _isMintable = false;
    }

    function withdraw() public payable onlyOwner {
        payable(owner()).transfer(getBalance());
    }
}