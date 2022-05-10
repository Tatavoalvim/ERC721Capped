// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ERC721Capped is ERC721 {

    constructor(string memory name, string memory symbol, uint64 cap) ERC721(name, symbol) {
        //TODO
    }

    function _createNFT()
        internal
    {
        //TODO

    }

    function ownerMint() public {
    }

    function publicMint() public {
        //TODO
    }

    function getTotalSupply() public {
        //TODO
    }

    function setMintPrice() public {
        //TODO
    }

    function openSales() public {
        //TODO
    }

    function closeSales() public {
        //TODO
    }
}
