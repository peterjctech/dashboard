<script setup lang="ts">
    defineProps({
        data: Array,
    });
</script>

<template>
    <div class="activity-progression">
        <line-chart :data="data" class="activity-progression__data" />
        <Button @click="$emit('reset')" type="primary" class="activity-progression__reset">Reset Filters</Button>
    </div>
</template>

<style lang="scss">
    .activity-progression {
        position: relative;
        &__data {
            position: absolute;
            bottom: 10rem;
        }
        &__reset {
            position: absolute;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
        }
    }
</style>
