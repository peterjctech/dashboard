import { createWebHashHistory, createRouter } from "vue-router";
import { HomePage, SettingsPage, TicketsPage, TrophyPage } from "@views";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            component: HomePage,
        },
        {
            path: "/tickets",
            component: TicketsPage,
        },
        {
            path: "/trophy",
            component: TrophyPage,
        },
        {
            path: "/settings",
            component: SettingsPage,
        },
    ],
});

export default router;
