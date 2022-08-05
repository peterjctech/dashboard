<script setup lang="ts">
    import { Tickets } from "@common";
    import { useTickets } from "@store";

    const ticketStore = useTickets();
</script>

<template>
    <main class="home-page">
        <Tickets
            :tickets="ticketStore.tickets.filter((obj) => obj.is_focused)"
            focused
            style="grid-area: 1 / 1 / 4 / 2"
        />
    </main>
</template>

<style lang="scss">
    .home-page {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(6, 1fr);
    }
</style>
