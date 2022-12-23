import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/account",
        name: "user",
        component: function () {
            return import("../views/UserPage.vue");
        },
    },
    {
        path: "/:catchAll(.*)",
        name: "not_found",
        component: function () {
            return import("../views/NotFound.vue");
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: "smooth",
            };
        }
    },
});

export default router;
