import { createWebHashHistory, createRouter } from "vue-router";
import { HomePage, TicketsPage, FitnessPage, SettingsPage } from "@views";

const routes = [
    {
        path: "/",
        component: HomePage,
    },
    {
        path: "/tickets",
        component: TicketsPage,
    },
    {
        path: "/fitness",
        component: FitnessPage,
    },
    {
        path: "/settings",
        component: SettingsPage,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export { router };
