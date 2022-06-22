<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import { Habits, Goals, Schedule, PlannerForm } from "@domain";
    import { invoke } from "@helpers";
    import { GoalArgs, GoalModel, EventArgs, EventCategoryModel } from "@interfaces";
    import { useFormat } from "@mixins";

    const eventCategories = ref();
    const goals = ref();
    const events = ref();
    onMounted(async () => {
        const response = await invoke("getEventCategories");
        eventCategories.value = response.map((obj: EventCategoryModel) => {
            return {
                label: obj.category,
                value: obj.category_id,
            };
        });
        goals.value = await invoke("getGoals");
        events.value = await invoke("getEvents");
    });

    const createGoal = async (args: GoalArgs) => {
        const response = await invoke("createGoal", args);
        goals.value = response;
    };
    const createEvent = async (args: EventArgs) => {
        const response = await invoke("createEvent", args);
        events.value.push(response);
    };
    const deleteGoal = async (args: GoalModel) => {
        const response = await invoke("deleteGoal", args);
        goals.value = goals.value.filter((obj: GoalModel) => obj.goal_id !== response);
    };

    const presets = useFormat(["Weekly", "Monthly", "Quarterly", "Yearly"]);
</script>

<template>
    <main class="planner-page">
        <Habits />
        <Goals :goals="goals" @delete="deleteGoal" />
        <Schedule />
        <PlannerForm :categories="eventCategories" :presets="presets" @goal="createGoal" @event="createEvent" />
    </main>
</template>

<style lang="scss">
    .planner-page {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 2rem;

        > :nth-child(1) {
            grid-area: 1 / 1 / 2 / 2;
        }
        > :nth-child(2) {
            grid-area: 1 / 2 / 2 / 3;
        }
        > :nth-child(3) {
            grid-area: 2 / 1 / 3 / 2;
        }
        > :nth-child(4) {
            grid-area: 2 / 2 / 3 / 3;
        }
    }
</style>
