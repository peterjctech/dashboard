<script setup lang="ts">
    import { Icon } from "@vicons/utils";

    defineProps({
        type: {
            type: String,
            default: "primary",
        },
        variant: {
            type: String,
            default: "button",
        },
        size: {
            type: Number,
            default: 24,
        },
    });
</script>

<template>
    <Button v-if="variant === 'button'" circle size="large" :type="type" class="bordered">
        <Icon :size="size">
            <slot />
        </Icon>
    </Button>
    <Icon v-else :size="size">
        <slot />
    </Icon>
</template>
