<template>
    <NavigationBar />
    <HomePage />
    <FooterSection />
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import HomePage from "@/components/HomePage.vue";
import PricingSection from "@/components/PricingSection.vue";
import FooterSection from "@/components/FooterSection.vue";

export default {
    name: "HomeView",
    components: {
        NavigationBar,
        HomePage,
        PricingSection,
        FooterSection,
    },
};
</script>
