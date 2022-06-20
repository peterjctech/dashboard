import { createWebHashHistory, createRouter } from "vue-router";
import { HomePage, TicketsPage, FitnessPage, SettingsPage, AchievementsPage, PlannerPage, NotesPage } from "@views";

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
        path: "/achievements",
        component: AchievementsPage,
    },
    {
        path: "/planner",
        component: PlannerPage,
    },
    {
        path: "/notes",
        component: NotesPage,
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
