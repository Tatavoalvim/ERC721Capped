const truffleAssert = require("truffle-assertions");
const { BN } = require('@openzeppelin/test-helpers');
const ERC721Capped = artifacts.require("./ERC721Capped");

contract('ERC721Capped', (accounts) => {
    const [ owner, spender, recipient, other ] = accounts;

    var capped;
    cap = 20;

    beforeEach(async () =>  {
        capped = await ERC721Capped.new("ERC721Capped", "CAP", cap);
    });

    describe("Inicialization", () => {
        it("Owner can create token", async () => {
            await truffleAssert.passes(capped.ownerMint());
            totalSupply = await capped.getTotalSupply()
            assert.equal(totalSupply.toString(), '1');
        })
        it("Doesn't allow public to create token", async () => {
            for(i = 1; i < 10; i++) {
                await truffleAssert.fails(capped.ownerMint({from: accounts[i]}));
                await truffleAssert.fails(capped.publicMint({from:accounts[i]}));
            }
            totalSupply = await capped.getTotalSupply()
            assert.equal(totalSupply.toString(), '0');
        })
    })

    describe("Open sales", () => {
        beforeEach(async () =>  {
            newPrice = new BN(0.2);
            await truffleAssert.passes(capped.openSales(newPrice));
        });
        it("Open sales and allows minting for public", async () => {
            for(i = 0; i < 10; i++) {
                await truffleAssert.passes(capped.publicMint({from: accounts[i], value: newPrice}));
            }
            totalSupply = await capped.getTotalSupply()
            assert.equal(totalSupply.toString(), '10');
        })
        it("Changes the price", async () => {
            newestPrice = new BN(1);
            await truffleAssert.passes(capped.setMintPrice(newestPrice));

            await truffleAssert.fails(capped.publicMint({from: spender, value: newPrice}));
            await truffleAssert.passes(capped.publicMint({from: spender, value: newestPrice}));

            totalSupply = await capped.getTotalSupply()
            assert.equal(totalSupply.toString(), '1');

        })

        it("allows the owner to close the sale", async () => {
            await truffleAssert.passes(capped.closeSales());
            await truffleAssert.fails(capped.publicMint({from: other, value: newestPrice}));
        })
        it("doesnt allows the public to close the sale", async () => {
            await truffleAssert.fails(capped.closeSales({from: other}));
        })
    })

    describe("Cap", () => {
        it("Doesnt allow minting after cap is reached", async () => {
            price = new BN(0.01);
            capped.openSales(price)
            for(i = 0; i < cap; i++) {
                await capped.ownerMint();
            }
            await truffleAssert.fails(capped.ownerMint());
            await truffleAssert.fails(capped.publicMint({from: other, value: price}));
        })
    })

})