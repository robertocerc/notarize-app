import { createStore } from "vuex";
import web3Modal from "@/utils/web3modalConfig.js";
import Web3 from "web3";
import * as NOTARIZE_CONTRACT_JSON from "@/abi/N.json";
import * as USDT_ABI from "@/abi/U.json";

export default createStore({
    state: {
        isSignedInWallet: false,
        provider: null,
        web3: null,
        chainID: null,
        account: null,
        userDocs: null,
    },
    getters: {
        getAccount(state) {
            return state.account;
        },
    },
    mutations: {
        SET_WALLET_PROVIDER(state, payload) {
            state.provider = payload;
        },
        SET_WEB3(state, payload) {
            state.web3 = payload;
        },
        SET_SIGNED_IN_STATE(state, payload) {
            state.isSignedInWallet = payload;
        },
        SET_CHAIN_ID(state, payload) {
            state.chainID = payload;
        },
        SET_ACCOUNT(state, payload) {
            state.account = payload;
        },
        SET_USER_DOCS(state, payload) {
            state.userDocs = payload;
        },
    },
    actions: {
        async signInWithWallet({ commit, state, dispatch }) {
            try {
                const provider = await web3Modal.web3Modal.connect();
                const web3 = new Web3(provider);
                const chID = await web3.eth.getChainId();
                const accounts = await web3.eth.getAccounts();
                if (chID != process.env.VUE_APP_NETWORK_ID) {
                    return await provider
                        .request({
                            method: "wallet_switchEthereumChain",
                            params: [
                                {
                                    chainId: web3.utils.toHex(
                                        process.env.VUE_APP_NETWORK_ID
                                    ),
                                },
                            ],
                        })
                        .then(async () => {
                            return await dispatch("signInWithWallet");
                        });
                }
                commit("SET_WEB3", web3);
                commit("SET_WALLET_PROVIDER", provider);
                commit("SET_CHAIN_ID", chID);
                commit("SET_ACCOUNT", accounts[0]);

                provider.on("chainChanged", async () => {
                    return await dispatch("signInWithWallet");
                });

                provider.on("accountsChanged", (accounts) => {
                    commit("SET_ACCOUNT", accounts[0]);
                });
                commit("SET_SIGNED_IN_STATE", true);
            } catch (error) {
                throw new Error(error);
            }
        },
        async subscribe({ state, dispatch }, payload) {
            try {
                if (state.account) {
                    if (state.chainID == process.env.VUE_APP_NETWORK_ID) {
                        const { notarizeContract, USDTContract } =
                            await dispatch("loadContract");
                        const subscriptionPrice = await notarizeContract.methods
                            .getSubscriptionPrice()
                            .call({ from: state.account });
                        const { tokenBal, approvedBal } = await dispatch(
                            "getApprovedAmount"
                        );
                        const uSub = await dispatch("getUserSubscription");
                        if (uSub * 1000 < parseInt(Date.now())) {
                            if (tokenBal < subscriptionPrice) {
                                if (
                                    parseInt(approvedBal) <
                                    parseInt(subscriptionPrice)
                                ) {
                                    await USDTContract.methods
                                        .approve(
                                            process.env
                                                .VUE_APP_NOTARIZE_CONTRACT_ADDRESS,
                                            String(
                                                state.web3.utils.toWei(
                                                    String(10),
                                                    "ether"
                                                )
                                            )
                                        )
                                        .send({ from: state.account })
                                        .then(async () => {
                                            await notarizeContract.methods
                                                .subscribe(payload.subCycle)
                                                .send({ from: state.account });
                                        })
                                        .catch((e) => {
                                            throw new Error(e);
                                        });
                                } else {
                                    await notarizeContract.methods
                                        .subscribe(payload.subCycle)
                                        .send({ from: state.account });
                                }
                            } else {
                                return await dispatch("activatePurchase").then(
                                    async () => {
                                        await notarizeContract.methods
                                            .subscribe(
                                                payload.noOfSubscriptionCycles
                                            )
                                            .send({ from: state.account });
                                    }
                                );
                            }

                            await notarizeContract.methods
                                .subscribe(payload.noOfSubscriptionCycles)
                                .send({ from: state.account });
                        } else {
                            return "Sub still valid";
                        }
                    } else {
                        return await dispatch("signInWithWallet");
                    }
                } else {
                    await dispatch("signInWithWallet").then(async () => {
                        await dispatch("subscribe", payload.subCycle);
                    });
                }
            } catch (error) {
                return error;
            }
        },
        async getApprovedAmount({ state, dispatch }) {
            try {
                const { USDTContract } = await dispatch("loadContract");
                const tokenBal = await USDTContract.methods
                    .balanceOf(state.account)
                    .call({ from: state.account });
                const approvedBal = await USDTContract.methods
                    .allowance(
                        state.account,
                        process.env.VUE_APP_NOTARIZE_CONTRACT_ADDRESS
                    )
                    .call();
                const nativeTokenBal = await state.web3.eth.getBalance(
                    state.account
                );
                return { tokenBal, approvedBal, nativeTokenBal };
            } catch (error) {
                return null;
            }
        },
        async loadContract({ state, dispatch }) {
            if (state.isSignedInWallet != true)
                return await dispatch("signInWithWallet").then(
                    async () => await dispatch("loadContract")
                );
            try {
                const notarizeContract = new state.web3.eth.Contract(
                    NOTARIZE_CONTRACT_JSON.default,
                    process.env.VUE_APP_NOTARIZE_CONTRACT_ADDRESS
                );
                const USDTAddress = await notarizeContract.methods
                    .getTokenPaymentAddress()
                    .call();
                const USDTContract = new state.web3.eth.Contract(
                    USDT_ABI.default,
                    USDTAddress
                );
                return { notarizeContract, USDTContract };
            } catch (error) {
                return null;
            }
        },
        async getValidUser({ state, dispatch }) {
            const { notarizeContract } = await dispatch("loadContract");
            const dl = await notarizeContract.methods
                .getUserSubscriptionDeadline(state.account)
                .call();
            return dl;
        },
        async notarizeDoc({ state, dispatch }, payload) {
            try {
                const { notarizeContract } = await dispatch("loadContract");
                await notarizeContract.methods
                    .notarizeDoc(payload.docHash)
                    .send({ from: state.account });
                await dispatch("getDocs");
                return true;
            } catch (error) {
                return null;
            }
        },
        async getUserSubscription({ state, dispatch }) {
            try {
                const { notarizeContract } = await dispatch("loadContract");
                const res = await notarizeContract.methods
                    .getUserSubscriptionDeadline(state.account)
                    .call({ from: state.account });
                return res;
            } catch (error) {
                return 0;
            }
        },
        async getDocs({ state, dispatch, commit }) {
            try {
                const { notarizeContract } = await dispatch("loadContract");
                const res = await notarizeContract.methods
                    .getNotarizedDocs(state.account)
                    .call({ from: state.account });
                commit("SET_USER_DOCS", res);
                return res;
            } catch (error) {
                return null;
            }
        },
    },
    modules: {},
});
