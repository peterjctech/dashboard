<script setup lang="ts">
    import {
        ActivitiesConfig,
        EventCategoriesConfig,
        HabitsConfig,
        QuotesConfig,
        ShortcutsConfig,
        TicketCategoriesConfig,
    } from "@domain";
    import { useFormat } from "@mixins";
    import { NTabs as Tabs, NTabPane as TabPane } from "naive-ui";

    const classes = useFormat([
        "primary",
        "secondary",
        "tertiary",
        "red",
        "orange",
        "yellow",
        "green",
        "cyan",
        "blue",
        "purple",
        "magenta",
        "pink",
        "light",
    ]);
    const activityTypes = useFormat(["Timed", "Duration", "Count"]);
    const shortcutTypes = useFormat(["Application", "Link", "Search"]);
</script>

<template>
    <main class="settings-page">
        <Card class="settings-page__card">
            <Tabs animated>
                <TabPane name="Activities">
                    <ActivitiesConfig :classes="classes" :types="activityTypes" />
                </TabPane>
                <TabPane name="Ticket Categories">
                    <TicketCategoriesConfig :classes="classes" />
                </TabPane>
                <TabPane name="Event Categories">
                    <EventCategoriesConfig :classes="classes" />
                </TabPane>
                <TabPane name="Habits">
                    <HabitsConfig :classes="classes" />
                </TabPane>
                <TabPane name="Quotes">
                    <QuotesConfig />
                </TabPane>
                <TabPane name="Shortcuts">
                    <ShortcutsConfig :types="shortcutTypes" />
                </TabPane>
            </Tabs>
        </Card>
    </main>
</template>

<style lang="scss">
    .settings-page {
        &__card {
            width: 100%;
            height: 100%;

            .n-tabs {
                display: flex;
                flex-flow: column;
            }

            .n-tabs-pane-wrapper,
            .n-tabs,
            .n-tab-pane {
                height: 100%;
            }

            .n-tab-pane {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                grid-template-rows: 1fr;
                gap: 2rem;

                > :nth-child(1) {
                    grid-area: 1 / 1 / 2 / 2;
                }
                > :nth-child(2) {
                    grid-area: 1 / 2 / 2 / 4;
                }
                > :nth-child(3) {
                    grid-area: 1 / 4 / 2 / 5;
                }
            }
        }
    }
</style>
