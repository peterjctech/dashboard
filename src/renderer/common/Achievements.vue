<script setup lang="ts">
    import { useDataTable } from "@hooks";
    import { useTrophy } from "@store";
    import { Achievement } from "@types";
    import { Trash } from "@vicons/ionicons5";
    import { PropType } from "vue";

    defineProps({
        achievements: Array as PropType<Achievement[]>,
        record: {
            type: Boolean,
            default: false,
        },
    });

    const trophyStore = useTrophy();

    const recordColumns = [
        { title: "Type", key: "category", width: 180 },
        { title: "PR", key: "achievement" },
    ];

    const columns = [
        { title: "Type", key: "category", width: 200 },
        { title: "Achievements", key: "achievement" },
        { title: "Date", key: "date", width: 160 },
        useDataTable.icon({
            title: "Delete",
            type: "error",
            click: (row: Achievement) => trophyStore.deleteAchievement(row),
            icon: Trash,
        }),
    ];
</script>

<template>
    <DataTable
        :data="achievements"
        :columns="record ? recordColumns : columns"
        :row-class-name="(row: Achievement) => row.color"
        flex-height
    />
</template>
