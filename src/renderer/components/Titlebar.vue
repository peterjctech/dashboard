<script setup lang="ts">
    import { Add, Close, Remove } from "@vicons/ionicons5";
    import { invoke } from "@helpers";
</script>

<template>
    <div class="titlebar">
        <h3 class="titlebar__title">Dashboard</h3>
        <div class="titlebar__buttons">
            <Icon @click="invoke('minimizeWindow')" type="warning">
                <Remove />
            </Icon>
            <Icon @click="invoke('maximizeWindow')" type="success">
                <Add />
            </Icon>
            <Icon @click="invoke('closeWindow')" type="error">
                <Close />
            </Icon>
        </div>
    </div>
</template>

<style lang="scss">
    .titlebar {
        position: fixed;
        top: 0;
        left: 0;
        height: 4rem;
        width: 100vw;
        background-color: $neutral-4;
        -webkit-app-region: drag;
        display: flex;
        justify-content: space-between;

        &__title {
            font-family: $fancy;
            color: $neutral-1;
            margin-left: 0.7rem;
        }

        &__buttons {
            align-self: center;
            -webkit-app-region: no-drag;
        }
    }
</style>
