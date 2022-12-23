const USDT = artifacts.require("USDT");
const Notarize = artifacts.require("Notarize");

module.exports = async function (deployer) {
    await deployer.deploy(USDT);
    const token = await USDT.deployed();

    await deployer.deploy(Notarize, token.address);
};
