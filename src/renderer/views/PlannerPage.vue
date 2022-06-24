<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import { Habits, Goals, Schedule, PlannerForm } from "@domain";
    import { invoke } from "@helpers";
    import { GoalArgs, GoalModel, EventArgs, EventModel } from "@interfaces";
    import { useFormat } from "@mixins";

    const goals = ref();
    const events = ref();
    onMounted(async () => {
        goals.value = await invoke("getGoals");
        events.value = await invoke("getEvents");
    });

    const createGoal = async (args: GoalArgs) => {
        const response = await invoke("createGoal", args);
        goals.value = response;
    };
    const createEvent = async (args: EventArgs) => {
        const response = await invoke("createEvent", args);
        if (response) events.value = response;
    };
    const deleteGoal = async (args: GoalModel) => {
        const response = await invoke("deleteGoal", args);
        goals.value = goals.value.filter((obj: GoalModel) => obj.goal_id !== response);
    };
    const deleteEvent = async (args: GoalModel) => {
        const response = await invoke("deleteEvent", args);
        events.value = events.value.filter((obj: EventModel) => obj.event_id !== response);
    };

    const presets = useFormat(["Weekly", "Monthly", "Quarterly", "Yearly"]);
</script>

<template>
    <main class="planner-page">
        <Habits />
        <Goals :goals="goals" @delete="deleteGoal" />
        <Schedule :events="events" @delete="deleteEvent" />
        <PlannerForm :presets="presets" @goal="createGoal" @event="createEvent" />
    </main>
</template>

<style lang="scss">
    .planner-page {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(5, 1fr);
        gap: 2rem;
        > :nth-child(1) {
            grid-area: 1 / 1 / 3 / 4;
        }
        > :nth-child(2) {
            grid-area: 1 / 4 / 3 / 7;
        }
        > :nth-child(3) {
            grid-area: 3 / 1 / 6 / 5;
        }
        > :nth-child(4) {
            grid-area: 3 / 5 / 6 / 7;
        }
    }
</style>
