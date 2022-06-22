<script setup lang="ts">
    import { FocusedTickets } from "@domain";
</script>

<template>
    <main class="home-page">
        <FocusedTickets />
    </main>
</template>

<style lang="scss">
    .home-page {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        gap: 2rem;
    }
</style>
