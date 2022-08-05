<script setup lang="ts">
    import { useDataTable } from "@hooks";
    import { useTrophy } from "@store";
    import { Goal } from "@types";
    import { Trash } from "@vicons/ionicons5";

    const trophyStore = useTrophy();

    const columns = [
        { title: "Goal", key: "goal" },
        { title: "Status", key: "status", width: 120 },
        { title: "Deadline", key: "date", width: 180 },
        { title: "Length", key: "length", width: 100 },
        useDataTable.icon({
            title: "Delete",
            type: "error",
            click: (row: Goal) => trophyStore.deleteGoal(row),
            icon: Trash,
        }),
    ];
</script>

<template>
    <DataTable :data="trophyStore.goals" :columns="columns" :row-class-name="(row: Goal) => row.color" flex-height />
</template>
