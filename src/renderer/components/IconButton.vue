<script setup lang="ts">
    defineProps({
        type: String,
    });
</script>

<template>
    <Button circle size="large" :type="type" class="bordered">
        <Icon size="24">
            <slot />
        </Icon>
    </Button>
</template>
