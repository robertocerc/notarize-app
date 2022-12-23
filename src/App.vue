<template>
    <!-- <div class="flex flex-col h-screen overflow-y-scroll bg-indigo-50"> -->
    <router-view />
    <!-- </div> -->
    <!-- <nav></nav> -->
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
export default {
    components: { NavigationBar },
    setup() {},
};
</script>
