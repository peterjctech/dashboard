<script setup lang="ts">
    import { h, PropType } from "vue";
    import { WorkoutModel } from "@interfaces";
    import { IconButton } from "@components";
    import { Trash } from "@vicons/ionicons5";

    defineProps({
        workouts: Array as PropType<WorkoutModel[]>,
    });
    const emit = defineEmits(["delete"]);

    const columns = [
        {
            title: "Activity",
            key: "activity",
        },
        {
            title: "Workout",
            key: "workout",
        },
        {
            title: "Date",
            key: "date",
            width: 160,
        },
        {
            title: "Delete",
            key: "delete",
            render(row: WorkoutModel) {
                return h(IconButton, { onClick: () => emit("delete", row), type: "error" }, () => h(Trash));
            },
            width: 80,
        },
    ];
</script>

<template>
    <DataTable :columns="columns" :data="workouts" :row-class-name="(row: WorkoutModel) => row.class" flex-height />
</template>
