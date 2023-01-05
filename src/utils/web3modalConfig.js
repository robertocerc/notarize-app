import Web3Modal from "web3modal";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";

const providerOptions = {
    // opera: {
    //     package: true,
    // },
    // binancechainwallet: {
    //     package: true,
    // },
    // coinbasewallet: {
    //     package: CoinbaseWalletSDK,
    //     options: {
    //         appName: "Web 3 Modal Demo",
    //         infuraId: process.env.VUE_APP_INFURA_KEY,
    //     },
    // },
    walletconnect: {
        package: WalletConnect,
        options: {
            infuraId: process.env.VUE_APP_INFURA_KEY,
        },
    },
};

const web3Modal = new Web3Modal({
    providerOptions,
});

export default {
    web3Modal,
};
