<script setup lang="ts">
    import { NConfigProvider, darkTheme, GlobalThemeOverrides, NDialogProvider } from "naive-ui";
    import { Titlebar, Sidebar } from "@components";

    const themeOverrides: GlobalThemeOverrides = {
        common: {
            primaryColorPressed: "#8a2be2",
            primaryColorHover: "#a155e7",
            primaryColor: "#9540e4",
        },
        DataTable: {
            tdTextColor: "black",
        },
    };
</script>

<template>
    <NConfigProvider :theme="darkTheme" :theme-overrides="themeOverrides">
        <NDialogProvider>
            <Titlebar />
            <Sidebar />
            <router-view />
        </NDialogProvider>
    </NConfigProvider>
</template>

<style lang="scss">
    @import "./styles/helpers.scss";
    @import "./styles/toast.scss";
    @import "./styles/data-table.scss";

    * {
        margin: 0;
        padding: 0;
        font-family: $default;
        box-sizing: border-box;
    }

    html {
        font-size: 62.5%;
    }

    main {
        background-color: $neutral-dark;
        width: calc(100vw - 6rem);
        height: calc(100vh - 4rem);
        padding: 2rem;
    }

    h1 {
        font-size: 4rem;
    }

    h2 {
        font-size: 3.5rem;
    }

    h3 {
        font-size: 3rem;
    }

    h4 {
        font-size: 2.5rem;
    }

    h5 {
        font-size: 2rem;
    }

    h6 {
        font-size: 1.5rem;
    }
</style>
