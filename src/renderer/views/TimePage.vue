<script setup lang="ts">
    import { EventForm, Reminders, ReminderForm } from "@components";
    import { Events } from "@common";
    import { useTime } from "@store";

    const timeStore = useTime();
</script>

<template>
    <main class="time-page">
        <Events :events="timeStore.events" style="grid-area: 1 / 1 / 6 / 3" />
        <Reminders style="grid-area: 1 / 3 / 3 / 4" />
        <Card style="grid-area: 3 / 3 / 6 / 4">
            <Tabs animated>
                <TabPane name="Reminder">
                    <ReminderForm />
                </TabPane>
                <TabPane name="Event">
                    <EventForm />
                </TabPane>
            </Tabs>
        </Card>
    </main>
</template>

<style lang="scss">
    .time-page {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(5, 1fr);
    }
</style>
