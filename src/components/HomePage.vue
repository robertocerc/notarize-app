<template>
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
    <div
        class="p-12 text-center relative overflow-hidden bg-no-repeat bg-cover"
        style="background-image: url('logo.png'); height: 100%"
    >
        <div
            class="absolute top-0 right-0 bottom-0 left-0 w-full h-screen overflow-hidden bg-fixed"
            style="background-color: rgb(238, 242, 255)"
        >
            <div class="flex flex-col justify-center items-center">
                <div class="p-12 space-y-6">
                    <h1
                        class="text-indigo-800 text-4xl font-bold text-center px-5 md:px-20"
                    >
                        Free Cloud-Based Reliable Storage
                    </h1>
                    <h5 class="text-center text-indigo-800">
                        Take advantage of fast, decentralized and reliable
                        storage now!
                    </h5>
                </div>
                <div
                    class="block h-full rounded-lg shadow-lg bg-white max-w-sm text-center"
                >
                    <div class="p-6">
                        <h5 class="text-indigo-900 text-xl font-medium mb-2">
                            DROP
                        </h5>
                        <p class="text-gray-700 text-base mb-4">
                            Subscribe to Notarize documents on the Polygon
                            (MATIC) Network.
                        </p>
                        <p class="text-gray-700 text-base mb-4">$15/cycle</p>
                        <div class="flex justify-center">
                            <div class="mb-3 xl:w-96">
                                <label
                                    for="exampleNumber0"
                                    class="form-label inline-block mb-2 text-gray-700"
                                    >Number of Cycles</label
                                >
                                <input
                                    type="number"
                                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="exampleNumber0"
                                    placeholder="Cycles"
                                    v-model="noOfCycles"
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            class="inline-block px-6 py-2.5 bg-indigo-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                            id="subscribe-button"
                            @click="subscribe"
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useStore } from "vuex";

export default {
    name: "HomePage",
    setup() {
        const store = useStore();
        const noOfCycles = ref(null);
        const isLoading = ref(false);

        onBeforeMount(() => {
            console.log(process.env.BASE_URL);
        });

        async function subscribe() {
            isLoading.value = true;
            const res = await store.dispatch("subscribe", {
                subCycle: noOfCycles.value < 1 ? 1 : noOfCycles.value,
            });
            console.log(res);
            isLoading.value = false;
        }

        return { subscribe, noOfCycles, isLoading };
    },
};
</script>

<style></style>
