<script setup lang="ts">
    import { Events, Tickets, Habits } from "@common";
    import { Quote, Clock, Weather, Shortcuts } from "@components";
    import { useTickets, useTime, useNotebook } from "@store";
    import dayjs from "dayjs";

    const ticketStore = useTickets();
    const timeStore = useTime();
    const notebookStore = useNotebook();
</script>

<template>
    <main class="home-page">
        <Tickets
            :tickets="ticketStore.tickets.filter((obj) => obj.is_focused)"
            focused
            style="grid-area: 1 / 1 / 4 / 2"
        />
        <Habits
            :habits="notebookStore.habits.filter((obj) => dayjs().endOf('day').unix() >= obj.next_due)"
            compact
            style="grid-area: 4 / 1 / 7 / 2"
        />
        <Events
            :events="timeStore.events.filter((obj) => obj.status !== 'None')"
            compact
            style="grid-area: 1 / 2 / 5 / 3"
        />
        <Quote style="grid-area: 1 / 3 / 5 / 4" />
        <Clock style="grid-area: 6 / 3 / 7 / 4" />
        <Weather style="grid-area: 5 / 2 / 7 / 3" />
        <Shortcuts style="grid-area: 5 / 3 / 6 / 4" />
    </main>
</template>

<style lang="scss">
    .home-page {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(6, 1fr);
    }
</style>
