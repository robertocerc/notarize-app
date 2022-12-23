const { assert } = require("chai");
const { time } = require("openzeppelin-test-helpers");
const Web3 = require("web3");
const web3 = new Web3("http://127.0.0.1:8545");

const USDT = artifacts.require("USDT");
const Notarize = artifacts.require("Notarize");

require("chai").use(require("chai-as-promised")).should();

const tokens = (n) => String(web3.utils.toWei(String(n), "ether"));

const generateRandomHash = () => web3.utils.randomHex(32);

contract("Notarize", ([admin, jake, jose, jay]) => {
    let token, notarizeContract;

    beforeEach(async () => {
        token = await USDT.new();
        notarizeContract = await Notarize.new(token.address);
    });

    // describe("USDT deployment", async () => {
    //     it("contract has a name", async () => {
    //         const name = await token.name();
    //         console.log(name);
    //         assert.equal(name, "Tether USD", "Name doesnt match");
    //     });

    //     it("has the correct decimals", async () => {
    //         const dec = await token.decimals();
    //         assert.equal(dec, 6);
    //     });
    // });

    // describe("USDT minting", () => {
    //     it("mints to sender", async () => {
    //         await token.mint({ from: jake });
    //         const jakesBal = await token.balanceOf(jake);
    //         assert.equal(jakesBal, 10 * 10 ** 6);
    //     });
    // });

    // describe("Notarize deployment", () => {
    //     it("Verifies deployment variables", async () => {
    //         assert.equal(await notarizeContract.owner(), admin);
    //         assert.equal(
    //             await notarizeContract.getSubscriptionPrice(),
    //             "3000000"
    //         );
    //         assert.equal(
    //             await notarizeContract.getSubscriptionPeriod(),
    //             5 * 86400
    //         );
    //         assert.equal(
    //             await notarizeContract.getTokenPaymentAddress(),
    //             token.address
    //         );
    //     });
    // });

    // describe("Subscribe & Notarize Document", () => {
    //     it("should fail because user is not subscribed yet", async () => {
    //         const hash = generateRandomHash();
    //         await notarizeContract
    //             .notarizeDoc(hash)
    //             .should.be.rejectedWith("Subscription invalid or Expired");
    //         const dl = await notarizeContract.getUserSubscriptionDeadline(
    //             jake,
    //             {
    //                 from: jake,
    //             }
    //         );
    //         assert.equal(dl, 0);
    //     });
    //     it("should mint for jake and subscribe for him", async () => {
    //         await token.mint({ from: jake });
    //         await token.approve(notarizeContract.address, tokens(1), {
    //             from: jake,
    //         });
    //         await notarizeContract
    //             .subscribe(0)
    //             .should.be.rejectedWith("Cycles must be more than 0");
    //         const { logs } = await notarizeContract.subscribe(1, {
    //             from: jake,
    //         });
    //         const blockTimestamp = Number(String(logs[0].args[0]));
    //         const subPeriod = await notarizeContract.getSubscriptionPeriod();
    //         const userSubDeadline =
    //             await notarizeContract.getUserSubscriptionDeadline(jake, {
    //                 from: jake,
    //             });
    //         assert.equal(blockTimestamp + Number(subPeriod), userSubDeadline);
    //     });
    //     it("should allow jose to notarize doc", async () => {
    //         await token.mint({ from: jose });
    //         await token.approve(notarizeContract.address, tokens(1), {
    //             from: jose,
    //         });
    //         await notarizeContract.subscribe(1, {
    //             from: jose,
    //         });
    //         const hash = generateRandomHash();
    //         const { logs } = await notarizeContract.notarizeDoc(hash, {
    //             from: jose,
    //         });
    //         await notarizeContract
    //             .getNotarizedDocs(jake, { from: jake })
    //             .should.be.rejectedWith(
    //                 "You have not notarized any document yet"
    //             );
    //         const joseDocs = await notarizeContract.getNotarizedDocs(jose, {
    //             from: jose,
    //         });
    //         const jakeDocsAdmin = await notarizeContract.getNotarizedDocs(jake);
    //         assert.equal(jakeDocsAdmin.length, 0);
    //         assert.equal(String(logs[0].args[0]), hash.toString());
    //         assert.equal(joseDocs.length, 1);
    //         assert.equal(joseDocs[0].docHash, hash);
    //         assert.equal(joseDocs[0].creator, jose);
    //     });
    // });

    describe("reduce users balance after subscription", () => {
        it("decreases user token balance", async () => {
            await token.mint({ from: jake });
            await token.mint({ from: jake });
            await token.mint({ from: jay });
            await token.mint({ from: jay });
            await token.mint({ from: jay });
            await token.approve(notarizeContract.address, tokens(3), {
                from: jake,
            });
            await token.approve(notarizeContract.address, tokens(3), {
                from: jay,
            });
            await notarizeContract.subscribe(4, {
                from: jake,
            });
            await notarizeContract.subscribe(8, {
                from: jay,
            });
            const jakeBal = await token.balanceOf(jake);
            const jayBal = await token.balanceOf(jay);
            assert.equal(jakeBal, 8 * 10 ** 6);
            assert.equal(jayBal, 6 * 10 ** 6);
        });
    });

    // describe("should forward time & nullify subscriptions", () => {
    //     it("forwards time", async () => {
    //         await token.mint({ from: jay });
    //         await token.approve(notarizeContract.address, tokens(1), {
    //             from: jay,
    //         });
    //         await notarizeContract.subscribe(2, { from: jay });
    //         await time.increase(time.duration.days(11));
    //         await notarizeContract
    //             .notarizeDoc(generateRandomHash(), { from: jay })
    //             .should.be.rejectedWith("Subscription invalid or Expired");
    //     });
    // });

    describe("Withdraw", () => {
        it("allows admin to withdraw", async () => {
            await token.mint({ from: jay });
            await token.approve(notarizeContract.address, tokens(1), {
                from: jay,
            });
            await notarizeContract.subscribe(2, { from: jay });
            await notarizeContract.withdraw();
            const adminBal = await token.balanceOf(admin);
            assert.equal(adminBal - 10 * 10 ** 6, 6 * 10 ** 6);
        });
    });
});
