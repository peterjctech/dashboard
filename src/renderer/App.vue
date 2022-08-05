<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import { Sidebar, Titlebar } from "@components";
    import { NConfigProvider, darkTheme, GlobalThemeOverrides } from "naive-ui";
    import { useGeneral } from "@store";

    const generalStore = useGeneral();

    const loading = ref(true);

    onMounted(async () => {
        await generalStore.initApp();
        loading.value = false;
    });

    const themeOverrides: GlobalThemeOverrides = {
        common: {
            primaryColorPressed: "#8a2be2",
            primaryColorHover: "#a155e7",
            primaryColor: "#c699f0",
        },
        DataTable: {
            tdTextColor: "black",
        },
    };
</script>

<template>
    <NConfigProvider :theme="darkTheme" :theme-overrides="themeOverrides">
        <main v-if="loading" class="loading-page">
            <h1>Loading...</h1>
        </main>
        <router-view v-if="!loading" />
        <Sidebar v-if="!loading" />
        <Titlebar />
    </NConfigProvider>
</template>

<style lang="scss">
    @import "./styles/toast.scss";
    @import "./styles/transitions.scss";
    @import "./styles/helpers.scss";
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
