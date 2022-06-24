<script setup lang="ts">
    import { Home, Ticket, Settings, Barbell, Pencil, Book } from "@vicons/ionicons5";
    import { h } from "vue";
    import { Icon } from "@vicons/utils";
    import { RouterLink } from "vue-router";

    const pages = [
        {
            route: "/",
            icon: Home,
        },
        {
            route: "/tickets",
            icon: Ticket,
        },
        {
            route: "/planner",
            icon: Book,
        },
        {
            route: "/notes",
            icon: Pencil,
        },
        {
            route: "/fitness",
            icon: Barbell,
        },
        {
            route: "/settings",
            icon: Settings,
        },
    ];

    const root = () => {
        const links = pages.map((page) => {
            return h(RouterLink, { to: page.route, class: "sidebar__link" }, () =>
                h(Icon, { size: 40 }, () => h(page.icon))
            );
        });
        return h("div", { class: "sidebar bordered" }, links);
    };
</script>

<template>
    <root />
</template>

<style lang="scss">
    .sidebar {
        position: fixed;
        right: 0;
        top: 4rem;
        height: calc(100vh - 4rem);
        width: 6rem;
        background-color: $neutral;
        display: flex;
        flex-direction: column;

        &__link {
            color: $neutral-dark;
            margin: 1rem auto;
        }

        .router-link-active {
            color: $neutral-light;
        }
    }
</style>
