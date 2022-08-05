<script setup lang="ts">
    import { Goals, GoalForm, AchievementForm, AchievementTypes } from "@components";
    import { useTrophy } from "@store";
    import { ref, onMounted } from "vue";
    import { Achievement, Category } from "@types";
    import { Achievements } from "@common";

    const trophyStore = useTrophy();

    trophyStore.$subscribe((_, state) => {
        if (currentFilter.value) {
            filteredAchievements.value = state.achievements.filter((obj) => obj.category_id === currentFilter.value);
        } else {
            filteredAchievements.value = state.achievements;
        }
    });

    const filteredAchievements = ref<Achievement[]>([]);
    const currentFilter = ref();

    onMounted(() => {
        filteredAchievements.value = JSON.parse(JSON.stringify(trophyStore.achievements));
    });

    const select = (row: Category) => {
        currentFilter.value = row.category_id;
        filteredAchievements.value = trophyStore.achievements.filter((obj) => obj.category_id === currentFilter.value);
    };
</script>

<template>
    <main class="trophy-page">
        <Goals style="grid-area: 1 / 1 / 6 / 3" />
        <AchievementTypes :selected="currentFilter" @select="select" style="grid-area: 1 / 5 / 3 / 6" />
        <Achievements :achievements="filteredAchievements" style="grid-area: 3 / 3 / 6 / 5" />
        <Achievements :achievements="trophyStore.personalRecords" record style="grid-area: 1 / 3 / 3 / 5" />
        <Card style="grid-area: 3 / 5 / 6 / 6">
            <Tabs animated>
                <TabPane name="Goal">
                    <GoalForm />
                </TabPane>
                <TabPane name="Achievements">
                    <AchievementForm />
                </TabPane>
            </Tabs>
        </Card>
    </main>
</template>

<style lang="scss">
    .trophy-page {
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(5, 1fr);
    }
</style>
