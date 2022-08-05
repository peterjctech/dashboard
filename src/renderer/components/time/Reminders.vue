<script setup lang="ts">
    import { useDataTable } from "@hooks";
    import { useTime } from "@store";
    import { Reminder } from "@types";
    import { Trash } from "@vicons/ionicons5";
    import dayjs from "dayjs";

    const timeStore = useTime();

    const columns = [
        { title: "Reminder", key: "reminder" },
        { title: "Time", key: "time", width: 120 },
        useDataTable.icon({
            title: "Delete",
            type: "error",
            click: (row: Reminder) => timeStore.deleteReminder(row),
            icon: Trash,
        }),
    ];

    const rowClassName = (row: Reminder) => {
        if (row.timestamp >= dayjs().unix()) return "blue";
        return "red";
    };
</script>

<template>
    <DataTable :data="timeStore.reminders" :columns="columns" :row-class-name="rowClassName" flex-height />
</template>
