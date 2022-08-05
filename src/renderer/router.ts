import { createWebHashHistory, createRouter } from "vue-router";
import { HomePage, SettingsPage, TicketsPage, TrophyPage, TimePage, NotebookPage } from "@views";

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
            path: "/notebook",
            component: NotebookPage,
        },
        {
            path: "/time",
            component: TimePage,
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
