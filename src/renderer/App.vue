<script setup lang="ts">
    import { Sidebar, Titlebar } from "@components";
    import { NConfigProvider, darkTheme } from "naive-ui";
</script>

<template>
    <NConfigProvider :theme="darkTheme">
        <router-view />
        <Sidebar />
        <Titlebar />
    </NConfigProvider>
</template>

<style lang="scss">
    @import "./styles/toast.scss";
    @import "./styles/transitions.scss";
    @import "./styles/helpers.scss";

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
        position: fixed;
        top: 4rem;
        left: 0;
        width: calc(100vw - 6rem);
        height: calc(100vh - 4rem);
        background-color: $neutral-5;
        display: grid;
        padding: 2rem;
        gap: 2rem;
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
