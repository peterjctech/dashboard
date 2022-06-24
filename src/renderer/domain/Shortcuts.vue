<script setup lang="ts">
    import { invoke } from "@helpers";
    import { ref, onMounted } from "vue";
    import { NModal } from "naive-ui";

    const shortcuts: any = ref({
        apps: [],
        links: [],
        searches: [],
    });
    const modalType = ref({
        app: false,
        link: false,
        search: false,
    });
    const search = ref("");

    onMounted(async () => {
        const response = await invoke("getShortcuts", { object: true });
        shortcuts.value = response;
    });

    const setType = (type: string) => {
        const defaultModal = {
            app: false,
            link: false,
            search: false,
        };
        modalType.value = { ...defaultModal, [type]: true };
    };

    const openLink = (shortcut: string) => window.open(shortcut);
    const openSearch = (shortcut: string) => {
        const parsedQuery = search.value.replace(" ", "+");
        window.open("https://www.google.com/search?q=" + parsedQuery + "+site:" + shortcut);
    };
    const searchGoogle = () => {
        const parsedQuery = search.value.replace(" ", "+");
        window.open("https://www.google.com/search?q=" + parsedQuery);
    };
    const searchYoutube = () => {
        const parsedQuery = search.value.replace(" ", "+");
        window.open("https://www.youtube.com/results?search_query=" + parsedQuery);
    };
    const openApp = (shortcut: string) => {
        invoke("openApplication", { path: shortcut });
    };
</script>

<template>
    <div class="shortcuts">
        <Button @click="setType('app')" type="primary">Applications</Button>
        <Button @click="setType('link')" type="success">Links</Button>
        <Button @click="setType('search')" type="info">Search</Button>
    </div>
    <NModal v-model:show="modalType.app" title="Applications" preset="card" class="shortcuts__modal">
        <div v-for="shortcut in shortcuts.apps" @click="openApp(shortcut.shortcut)" class="shortcuts__item">
            <img :src="shortcut.icon" />
            <h6>{{ shortcut.title }}</h6>
        </div>
    </NModal>
    <NModal v-model:show="modalType.link" title="Links" preset="card" class="shortcuts__modal">
        <div v-for="shortcut in shortcuts.links" @click="openLink(shortcut.shortcut)" class="shortcuts__item">
            <img :src="shortcut.icon" />
            <h6>{{ shortcut.title }}</h6>
        </div>
    </NModal>
    <NModal v-model:show="modalType.search" title="Search" preset="card" class="shortcuts__modal">
        <Input v-model:value="search" placeholder="Search" />
        <div @click="searchGoogle" class="shortcuts__item">
            <img src="https://www.kindpng.com/picc/m/25-255262_google-chrome-icon-google-chrome-icon-jpg-hd.png" />
            <h6>Google</h6>
        </div>
        <div @click="searchYoutube" class="shortcuts__item">
            <img src="https://image.similarpng.com/very-thumbnail/2020/05/Popular-Logo-YouTube-icon-PNG.png" />
            <h6>YouTube</h6>
        </div>
        <div v-for="shortcut in shortcuts.searches" @click="openSearch(shortcut.shortcut)" class="shortcuts__item">
            <img :src="shortcut.icon" />
            <h6>{{ shortcut.title }}</h6>
        </div>
    </NModal>
</template>

<style lang="scss">
    .shortcuts {
        display: flex;
        justify-content: space-around;
        margin: auto 5rem;

        &__modal {
            width: 80rem;

            .n-card__content {
                display: flex;
                flex-wrap: wrap;
            }

            img {
                width: 10rem;
                border-radius: 1rem;
                cursor: pointer;
                opacity: 0.3;
            }

            h6 {
                position: absolute;
                bottom: 2rem;
                left: 50%;
                font-size: 1rem;
                transform: translateX(-50%);
                color: $neutral-light;
                letter-spacing: 1px;
                text-shadow: 0px 4px 4px black;
            }
        }

        &__item {
            position: relative;
            width: 10rem;
            margin: 2rem;
        }
    }
</style>
