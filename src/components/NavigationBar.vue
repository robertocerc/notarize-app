<template>
    <nav class="flex flex-row items-center justify-between bg-white px-6 py-4">
        <!-- <div class="w-1/5 flex items-center flex-shrink-0 text-indigo-800 mr-6"> -->
        <router-link :to="{ name: 'home' }" class="w-10 cursor-pointer">
            <img src="storage.png" class="w-1/5 h-full object-cover" />
            <!-- <object type="image/svg+xml" data="storage.svg"></object> -->
        </router-link>
        <!-- </div> -->
        <div class="text-sm hidden lg:flex flex-row">
            <router-link
                class="block mt-4 lg:inline-block lg:mt-0 text-indigo-800 hover:text-indigo-400 mr-4"
                :to="{ name: 'home', hash: '#subscribe-button' }"
            >
                Subscribe
            </router-link>
            <router-link
                v-if="$store.state.account"
                :to="{
                    name: 'user',
                }"
                class="block mt-4 lg:inline-block lg:mt-0 text-indigo-800 hover:text-indigo-400 mr-4"
                >Account</router-link
            >
        </div>
        <div class="hidden lg:flex flex-row px-2 gap-x-1">
            <div>
                <button
                    type="button"
                    class="inline-block text-sm px-4 py-2 leading-none border rounded text-indigo-800 bg-indigo-100 border-white hover:border-transparent hover:text-indigo-400 hover:bg-indigo-100 mt-4 lg:mt-0"
                    v-if="$store.state.account"
                >
                    {{ truncateAddress($store.state.account) }}
                </button>
            </div>
            <div>
                <button
                    type="button"
                    class="inline-block text-sm px-4 py-2 leading-none bg-indigo-800 border rounded text-white border-white hover:border-transparent hover:bg-indigo-400 mt-4 lg:mt-0"
                    v-if="!$store.state.account"
                    @click.prevent="signIn"
                >
                    Connect
                </button>
            </div>
        </div>
        <div class="block lg:hidden" @click="toggleNav">
            <button
                class="flex items-center px-3 py-2 border rounded text-indigo-800 border-indigo-800 hover:text-indigo-400 hover:border-indigo-400"
            >
                <svg
                    class="fill-current h-3 w-3"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
            </button>
        </div>
        <div class="w-full block flex-grow lg:hidden" v-if="!isNavHidden">
            <div class="text-sm lg:flex-grow">
                <router-link
                    class="block mt-4 lg:inline-block lg:mt-0 text-indigo-800 hover:text-indigo-400 mr-4"
                    :to="{ name: 'home', hash: '#subscribe-button' }"
                >
                    Subscribe
                </router-link>
                <router-link
                    v-if="$store.state.account"
                    :to="{
                        name: 'user',
                    }"
                    class="block mt-4 lg:inline-block lg:mt-0 text-indigo-800 hover:text-indigo-400 mr-4"
                    >Account</router-link
                >
                <div class="flex flex-col md:w-1/2 mx-auto">
                    <button
                        class="inline-block text-sm px-2 py-2 leading-none border bg-indigo-800 rounded text-white border-white hover:border-transparent hover:text-indigo-100 hover:bg-indigo-400 mt-4 lg:mt-0"
                        v-if="$store.state.account"
                    >
                        {{ truncateAddress($store.state.account) }}
                    </button>
                    <button
                        class="inline-block text-sm px-4 py-2 leading-none border rounded bg-indigo-800 text-white border-white hover:border-transparent hover:text-indigo-100 hover:bg-indigo-400 mt-4 lg:mt-0"
                        v-if="!$store.state.account"
                        @click.prevent="signIn"
                    >
                        Connect
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
    name: "NavigationBar",
    setup() {
        const isNavHidden = ref(true);
        const store = useStore();

        const toggleNav = () => {
            isNavHidden.value = !isNavHidden.value;
        };
        const signIn = () => store.dispatch("signInWithWallet");
        const truncateAddress = (address) =>
            `${address.substring(0, 4)}...${address.substring(
                address.length - 4
            )}`;

        return {
            toggleNav,
            isNavHidden,
            signIn,
            truncateAddress,
        };
    },
};
</script>

<style></style>
