<script setup lang="ts">
    import { FocusedTickets, Shortcuts, Clock, UpcomingEvents, Quote, Weather, Reminders } from "@domain";
</script>

<template>
    <main class="home-page">
        <FocusedTickets />
        <Reminders />
        <UpcomingEvents />
        <Weather />
        <Quote />
        <Shortcuts />
        <Clock />
    </main>
</template>

<style lang="scss">
    .home-page {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(6, 1fr);
        gap: 2rem;
        > :nth-child(1) {
            grid-area: 1 / 1 / 4 / 2;
        }
        > :nth-child(2) {
            grid-area: 4 / 1 / 7 / 2;
        }
        > :nth-child(3) {
            grid-area: 1 / 2 / 5 / 3;
        }
        > :nth-child(4) {
            grid-area: 5 / 2 / 7 / 3;
        }
        > :nth-child(5) {
            grid-area: 1 / 3 / 5 / 4;
        }
        > :nth-child(6) {
            grid-area: 5 / 3 / 6 / 4;
        }
        > :nth-child(7) {
            grid-area: 6 / 3 / 7 / 4;
        }
    }
</style>
