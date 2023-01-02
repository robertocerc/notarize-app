<template>
    <footer
        class="fixed bottom-0 w-full bg-indigo-50 text-center border border-t-2 lg:text-left"
    >
        <div class="text-indigo-800 text-center px-4">
            <router-link :to="{ name: 'home' }" class="text-indigo-800"
                >DROCHAIN</router-link
            >
        </div>
    </footer>
</template>

<script>
export default {
    name: "FooterSection",
};
</script>

<style></style>
