<template>
    <div
        class="mb-10 bg-gradient-to-tl from-indigo-50 to-indigo-50 w-full h-72 relative mx-auto lg:h-96 lg:w-3/4"
    >
        <img
            src="bg-1.png"
            class="w-full h-full object-cover absolute mix-blend-overlay opacity-50"
        />
        <div
            class="flex justify-center absolute bottom-4 z-50 mx-auto w-full bg-indigo-50"
        >
            <div
                class="block rounded-lg shadow-lg bg-white max-w-sm text-center"
            >
                <div class="p-6">
                    <h5 class="text-indigo-900 text-xl font-medium mb-2">
                        DROCHAIN
                    </h5>
                    <p class="text-gray-700 text-base mb-4">
                        Subscribe to Notarize documents on the Polygon (MATIC)
                        Network.
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
</template>

<script>
export default {
    name: "PricingSection",
};
</script>

<style></style>
