<script setup lang="ts">
    import { useDataTable } from "@hooks";
    import { useNotebook } from "@store";
    import { Habit } from "@types";
    import { Trash, Checkmark } from "@vicons/ionicons5";
    import { PropType } from "vue";

    defineProps({
        habits: Array as PropType<Habit[]>,
        compact: {
            type: Boolean,
            default: false,
        },
    });

    const notebookStore = useNotebook();

    const checkColumn = useDataTable.icon({
        title: "Check",
        type: "success",
        click: (row: Habit) => notebookStore.checkHabit(row),
        icon: Checkmark,
    });

    const compactColumns = [
        checkColumn,
        { title: "Habit", key: "habit" },
        { title: "Streak", key: "streak", width: 100 },
    ];

    const columns = [
        checkColumn,
        { title: "Habit", key: "habit" },
        { title: "Frequency (in days)", key: "frequency", width: 100 },
        { title: "Next Due", key: "due_date", width: 200 },
        { title: "Streak", key: "streak", width: 120 },
        useDataTable.icon({
            title: "Delete",
            type: "error",
            click: (row: Habit) => notebookStore.deleteHabit(row),
            icon: Trash,
        }),
    ];
</script>

<template>
    <DataTable
        :data="habits"
        :columns="compact ? compactColumns : columns"
        :row-class-name="(row: Habit) => row.color"
        flex-height
    />
</template>
