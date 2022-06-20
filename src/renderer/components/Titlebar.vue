<script setup lang="ts">
    import { Close, Add, Remove } from "@vicons/ionicons5";
    import { invoke } from "@helpers";
</script>

<template>
    <div class="titlebar">
        <h3 class="titlebar__title">Dashboard 1.0.0</h3>
        <div class="titlebar__buttons">
            <Button @click="invoke('minimizeWindow')" circle type="warning" size="large" class="bordered">
                <Icon size="24">
                    <Remove />
                </Icon>
            </Button>
            <Button @click="invoke('maximizeWindow')" circle type="success" size="large" class="bordered">
                <Icon size="24">
                    <Add />
                </Icon>
            </Button>
            <Button @click="invoke('closeWindow')" circle type="error" size="large" class="bordered">
                <Icon size="24">
                    <Close />
                </Icon>
            </Button>
        </div>
    </div>
</template>

<style lang="scss">
    .titlebar {
        background-color: darken($neutral, 20%);
        height: 4rem;
        display: flex;
        -webkit-app-region: drag;

        &__title {
            font-family: $fancy;
            color: $neutral-light;
            margin-left: 0.7rem;
        }

        &__buttons {
            margin-inline-start: auto;
            -webkit-app-region: no-drag;
        }
    }
</style>
