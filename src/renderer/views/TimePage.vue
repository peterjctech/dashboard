<script setup lang="ts">
    import { EventForm } from "@components";
    import { Events } from "@common";
    import { useTime } from "@store";

    const timeStore = useTime();
</script>

<template>
    <main class="time-page">
        <Events :events="timeStore.events" style="grid-area: 1 / 1 / 6 / 3" />
        <Card style="grid-area: 3 / 3 / 6 / 4">
            <Tabs animated>
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
