<template>
    <div class="flex flex-col h-screen">
        <NavigationBar />
        <div class="flex space-x-2 justify-between mx-8">
            <div>
                <div class="dropdown relative">
                    <button
                        class="inline-flex px-6 py-2.5 bg-indigo-800 text-white font-bold text-xs leading-tight uppercase rounded shadow-md hover:text-indigo-800 hover:bg-indigo-200 hover:shadow-lg focus:bg-indigo-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-100 active:shadow-lg transition duration-150 ease-in-out"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Notarize Document +
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="caret-down"
                            class="w-2 ml-2"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                        >
                            <path
                                fill="currentColor"
                                d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                            ></path>
                        </svg>
                    </button>
                    <ul
                        class="dropdown-menu min-w-max absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none"
                        aria-labelledby="dropdownMenuButton1"
                    >
                        <div
                            class="block p-6 rounded-lg shadow-lg bg-white max-w-sm"
                        >
                            <form>
                                <div class="form-group mb-6">
                                    <label
                                        for="exampleInputTitle"
                                        class="form-label inline-block mb-2 text-gray-700"
                                        >Title</label
                                    >
                                    <input
                                        type="text"
                                        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="exampleInputTitle"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter title"
                                        v-model="fileTitle"
                                    />
                                </div>
                                <div class="flex justify-center">
                                    <div class="mb-3 w-96">
                                        <label
                                            for="formFile"
                                            class="form-label inline-block mb-2 text-gray-700"
                                            >Select file to Notarize</label
                                        >
                                        <input
                                            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            type="file"
                                            id="formFile"
                                            ref="fileUP"
                                        />
                                    </div>
                                </div>
                                <button
                                    class="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                    @click.prevent="validateFile"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </ul>
                </div>
            </div>
            <div>
                <div
                    class="dropdown relative"
                    v-if="Object.keys(userData) != 0"
                >
                    <button
                        class="inline-flex px-6 py-2.5 bg-indigo-800 text-white font-bold text-xs leading-tight uppercase rounded shadow-md hover:text-indigo-800 hover:bg-indigo-200 hover:shadow-lg focus:bg-indigo-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-100 active:shadow-lg transition duration-150 ease-in-out"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Account
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="caret-down"
                            class="w-2 ml-2"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                        >
                            <path
                                fill="currentColor"
                                d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                            ></path>
                        </svg>
                    </button>
                    <ul
                        class="dropdown-menu min-w-max absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none"
                        aria-labelledby="dropdownMenuButton1"
                    >
                        <div class="flex justify-center">
                            <ul
                                class="bg-white rounded-lg border border-gray-200 w-96 text-gray-900"
                            >
                                <li
                                    class="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"
                                >
                                    Subscription expires:
                                    {{
                                        userData.sub != 0
                                            ? getValidDate(userData.sub)
                                            : "No Subcription yet"
                                    }}
                                </li>
                                <li
                                    class="px-6 py-2 border-b border-gray-200 w-full"
                                >
                                    No Of Notarized Documents:
                                    {{ userData.docsLength }}
                                </li>
                            </ul>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
        <DocSection :docData="docData" />
        <div
            class="flex justify-center items-center space-x-2 my-auto"
            v-if="isLoading"
        >
            <div
                class="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0 text-indigo-800"
                role="status"
            >
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <FooterSection />
    </div>
</template>

<script>
import DocSection from "@/components/DocSection.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import FooterSection from "@/components/FooterSection.vue";
import { useRoute, useRouter } from "vue-router";
import { onBeforeMount, ref, onMounted } from "vue";
import { useStore } from "vuex";

import client from "@/utils/ipfsConfig.js";
// import Widget from "@/utils/buyWidgetConfig.js";

export default {
    name: "UserPage",
    components: {
        DocSection,
        NavigationBar,
        FooterSection,
    },
    setup() {
        const isLoading = ref(true);
        const router = useRouter();
        const store = useStore();
        const fileUP = ref(null);
        const fileTitle = ref(null);
        const docData = ref(null);
        const userData = ref({});

        const getDocs = async () => {
            const res = await store.dispatch("getDocs");
            console.log(res);
        };

        onBeforeMount(async () => {
            if (!store.getters.getAccount) {
                await store
                    .dispatch("signInWithWallet")
                    .catch((e) => {
                        return router.push({ name: "home" });
                    })
                    .then(async () => await getDocs());
            } else {
                await getDocs();
            }
            docData.value = await store.dispatch("getDocs");
            userData.value = await getUserData();
            console.log(userData.value);
            isLoading.value = false;
        });

        const getValidDate = (c) => {
            const d = new Date(c * 1000);
            const day = d.getDate();
            const month = d.getMonth() + 1;
            const year = d.getFullYear();
            const h = d.getHours();
            const m = d.getMinutes();
            const s = d.getSeconds();
            return `${day}-${month}-${year} ${h}:${m}:${s}`;
        };

        async function validateFile() {
            try {
                const fileDetails = {
                    name: String(fileTitle.value),
                    file: fileUP.value.files[0],
                };
                if (
                    fileDetails.name.replace(/\s/g, "") == "" ||
                    fileDetails.file == null ||
                    fileDetails.name == null
                ) {
                    console.log("INvalid");
                } else {
                    const reader = new FileReader();
                    reader.readAsDataURL(fileDetails.file);
                    reader.onloadend = async () => {
                        const s = await store.dispatch("getUserSubscription");
                        const { notarizeContract } = await store.dispatch(
                            "loadContract"
                        );
                        const gasEst = await notarizeContract.methods
                            .notarizeDoc(store.state.web3.utils.randomHex(32))
                            .estimateGas({ from: store.state.account });
                        if (gasEst > 0) {
                            const res = await client.add(
                                JSON.stringify({
                                    name: fileDetails.name.trim(),
                                    file: reader.result,
                                }),
                                { pin: true }
                            );
                            const filePath = res.path;
                            const pathHex =
                                store.state.web3.utils.asciiToHex(filePath);
                            await store
                                .dispatch("notarizeDoc", {
                                    docHash: pathHex,
                                })
                                .then((res) => console.log(res));
                        }
                    };
                }
            } catch (error) {}
        }

        async function getUserData() {
            const sub = await store.dispatch("getUserSubscription");
            const docs = await store.dispatch("getDocs");

            return { sub, docsLength: docs == null ? 0 : docs.length };
        }

        return {
            validateFile,
            fileUP,
            fileTitle,
            docData,
            userData,
            getValidDate,
            isLoading,
        };
    },
};
</script>
