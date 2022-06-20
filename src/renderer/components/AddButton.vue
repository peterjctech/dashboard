<script setup lang="ts">
    import { Add } from "@vicons/ionicons5";
</script>

<template>
    <Button circle size="large" type="success" class="bordered">
        <Icon size="30">
            <Add />
        </Icon>
    </Button>
</template>

<style lang="scss">
    .add-button {
        background-color: $success;
    }
</style>
