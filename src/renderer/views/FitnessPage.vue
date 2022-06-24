<script setup lang="ts">
    import { WorkoutForm, WorkoutList, ActivityList, ActivityProgression } from "@domain";
    import { invoke } from "@helpers";
    import { ActivityModel, WorkoutArgs, WorkoutModel } from "@interfaces";
    import { onMounted, ref } from "vue";

    const workouts = ref();
    const filteredWorkouts = ref();
    const activities = ref();
    const activityOptions = ref<{ label: string; value: string }[]>([]);
    const selectedActivityData = ref();

    onMounted(async () => {
        const dbWorkouts = await invoke("getWorkouts");
        const dbActivities = await invoke("getActivities");
        workouts.value = dbWorkouts;
        filteredWorkouts.value = dbWorkouts;
        activities.value = dbActivities;
        dbActivities.forEach((obj: ActivityModel) => {
            activityOptions.value.push({
                label: obj.activity,
                value: obj.activity_id,
            });
        });
    });

    const createWorkout = async (args: WorkoutArgs) => {
        const response = await invoke("createWorkout", args);
        if (response) workouts.value.push(response);
    };
    const deleteWorkout = async (args: WorkoutModel) => {
        const response = await invoke("deleteWorkout", args);
        workouts.value = workouts.value.filter((obj: WorkoutModel) => obj.workout_id !== response);
    };
    const selectActivity = (id: string) => {
        filteredWorkouts.value = workouts.value.filter((obj: WorkoutModel) => obj.activity_id === id);
        const data = workouts.value.filter((obj: WorkoutModel) => obj.activity_id === id);
        selectedActivityData.value = data.map((obj: WorkoutModel) => {
            return [obj.date, obj.value];
        });
    };

    const resetFilter = () => {
        filteredWorkouts.value = workouts.value;
        selectedActivityData.value = workouts.value;
    };
</script>

<template>
    <main class="fitness-page">
        <WorkoutList :workouts="filteredWorkouts" @delete="deleteWorkout" />
        <ActivityProgression :data="selectedActivityData" @reset="resetFilter" />
        <ActivityList :activities="activities" @view="selectActivity" />
        <WorkoutForm :activities="activities" :options="activityOptions" @create="createWorkout" />
    </main>
</template>

<style lang="scss">
    .fitness-page {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 2rem;
        > :nth-child(1) {
            grid-area: 1 / 1 / 3 / 2;
        }
        > :nth-child(2) {
            grid-area: 1 / 2 / 2 / 4;
        }
        > :nth-child(3) {
            grid-area: 2 / 2 / 3 / 3;
        }
        > :nth-child(4) {
            grid-area: 2 / 3 / 3 / 4;
        }
    }
</style>
