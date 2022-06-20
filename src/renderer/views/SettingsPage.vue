<script setup lang="ts">
    import {
        ActivitiesConfig,
        EventCategoriesConfig,
        HabitsConfig,
        QuotesConfig,
        ShortcutsConfig,
        TicketCategoriesConfig,
    } from "@domain";
</script>

<template>
    <main class="settings-page">
        <TicketCategoriesConfig />
        <ShortcutsConfig />
        <ActivitiesConfig />
        <EventCategoriesConfig />
        <QuotesConfig />
        <HabitsConfig />
    </main>
</template>

<style lang="scss">
    .settings-page {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 2rem;

        > :nth-child(1) {
            grid-area: 1 / 1 / 2 / 2;
        }
        > :nth-child(2) {
            grid-area: 1 / 2 / 2 / 3;
        }
        > :nth-child(3) {
            grid-area: 1 / 3 / 2 / 4;
        }
        > :nth-child(4) {
            grid-area: 2 / 1 / 3 / 2;
        }
        > :nth-child(5) {
            grid-area: 2 / 2 / 3 / 3;
        }
        > :nth-child(6) {
            grid-area: 2 / 3 / 3 / 4;
        }
    }
</style>
