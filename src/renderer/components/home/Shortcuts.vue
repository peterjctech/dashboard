<script setup lang="ts">
    import { ref } from "vue";
    import { useMisc } from "@store";
    import { openApp, openLink, searchWebsite } from "@helpers";

    const miscStore = useMisc();
    const apps = miscStore.shortcuts.filter((obj) => obj.type === "Application");
    const links = miscStore.shortcuts.filter((obj) => obj.type === "Link");
    const searches = miscStore.shortcuts.filter((obj) => obj.type === "Search");

    const searchInput = ref();
    const type = ref();
    const showModal = ref(false);

    const setType = (newType: string) => {
        type.value = newType;
        showModal.value = true;
    };
</script>

<template>
    <div class="shortcuts">
        <Button @click="setType('Applications')" type="primary">Applications</Button>
        <Button @click="setType('Links')" type="success">Links</Button>
        <Button @click="setType('Search')" type="info">Search</Button>
        <Modal v-model:show="showModal" preset="card" :title="type" segmented bordered class="modal">
            <div v-if="type === 'Applications'" class="shortcuts__items">
                <div v-for="shortcut in apps" @click="openApp(shortcut.shortcut)" class="shortcuts__item">
                    <img v-if="shortcut.icon" :src="shortcut.icon" />
                    <svg v-else class="black-svg" viewBox="0 0 100 100">
                        <rect />
                    </svg>
                    <h6>{{ shortcut.title }}</h6>
                </div>
            </div>
            <div v-if="type === 'Links'" class="shortcuts__items">
                <div v-for="shortcut in links" @click="openLink(shortcut.shortcut)" class="shortcuts__item">
                    <img v-if="shortcut.icon" :src="shortcut.icon" />
                    <svg v-else class="black-svg" viewBox="0 0 100 100">
                        <rect />
                    </svg>
                    <h6>{{ shortcut.title }}</h6>
                </div>
            </div>
            <div v-if="type === 'Search'" class="shortcuts__items">
                <Input v-model:value="searchInput" placeholder="Search" />
                <div @click="searchWebsite(searchInput, 'google.com')" class="shortcuts__item">
                    <img
                        src="https://www.kindpng.com/picc/m/25-255262_google-chrome-icon-google-chrome-icon-jpg-hd.png"
                    />
                    <h6>Google</h6>
                </div>
                <div @click="searchWebsite(searchInput, 'youtube.com')" class="shortcuts__item">
                    <img src="https://image.similarpng.com/very-thumbnail/2020/05/Popular-Logo-YouTube-icon-PNG.png" />
                    <h6>YouTube</h6>
                </div>
                <div
                    v-for="shortcut in searches"
                    @click="searchWebsite(searchInput, shortcut.shortcut)"
                    class="shortcuts__item"
                >
                    <img v-if="shortcut.icon" :src="shortcut.icon" />
                    <svg v-else class="black-svg" viewBox="0 0 100 100">
                        <rect />
                    </svg>
                    <h6>{{ shortcut.title }}</h6>
                </div>
            </div>
        </Modal>
    </div>
</template>

<style lang="scss">
    .shortcuts {
        display: flex;
        justify-content: space-around;
        margin: auto 5rem;

        &__items {
            display: flex;
            flex-wrap: wrap;
        }
        &__item {
            position: relative;
            margin: 2rem;
            width: 10rem;
            height: 10rem;

            img,
            svg {
                width: 100%;
                height: 100%;
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
                color: $neutral-1;
                letter-spacing: 1px;
                text-shadow: 0px 4px 4px black;
                text-align: center;
                cursor: pointer;
            }
        }
    }

    .black-svg {
        rect {
            width: 100%;
            height: 100%;
            fill: black;
        }
    }
</style>
