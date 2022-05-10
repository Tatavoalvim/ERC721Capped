const ERC721Capped = artifacts.require("ERC721Capped");

module.exports = function (deployer) {
    cap = 25
    deployer.deploy(ERC721Capped, "ERC721Capped", "CAP", cap);
};