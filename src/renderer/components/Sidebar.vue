<script setup lang="ts">
    import { Icon } from "@vicons/utils";
    import { Home, Ticket, Settings } from "@vicons/ionicons5";
    import { h } from "vue";
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
            route: "/settings",
            icon: Settings,
        },
    ];

    const root = () => {
        const links = pages.map((obj) => {
            return h(RouterLink, { to: obj.route, class: "sidebar__link" }, () =>
                h(Icon, { size: 48 }, () => h(obj.icon))
            );
        });

        return h("div", { class: "sidebar__links" }, links);
    };
</script>

<template>
    <div class="sidebar bordered">
        <root />
    </div>
</template>

<style lang="scss">
    .sidebar {
        position: fixed;
        top: 4rem;
        right: 0;
        height: calc(100vh - 4rem);
        width: 6rem;
        background-color: $neutral-3;
        display: flex;
        flex-direction: column;

        &__links {
            display: flex;
            flex-direction: column;
        }

        &__link {
            color: $neutral-5;
            align-self: center;
            margin-top: 1.5rem;
            cursor: pointer;
        }

        .router-link-active {
            color: $neutral-1;
        }
    }
</style>
