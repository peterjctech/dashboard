<script setup lang="ts">
    import { TicketConfig, GeneralConfig, QuoteConfig, AchievementConfig } from "@components";
</script>

<template>
    <main class="settings-page">
        <Card>
            <Tabs animated>
                <TabPane name="Settings">
                    <GeneralConfig />
                </TabPane>
                <TabPane name="Tickets">
                    <TicketConfig />
                </TabPane>
                <TabPane name="Achievement">
                    <AchievementConfig />
                </TabPane>
                <TabPane name="Quotes">
                    <QuoteConfig />
                </TabPane>
            </Tabs>
        </Card>
    </main>
</template>

<style lang="scss">
    .settings-page {
        .n-tabs {
            display: flex;
            flex-flow: column;
        }

        .n-tab-pane,
        .n-tabs,
        .n-tabs-pane-wrapper {
            height: 100%;
        }
        .n-tab-pane {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: 1fr;

            > * {
                padding: 2rem;
            }

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
</style>
