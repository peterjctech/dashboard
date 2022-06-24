<script setup lang="ts">
    import { h, PropType } from "vue";
    import { GoalModel } from "@interfaces";
    import { IconButton } from "@components";
    import { Trash } from "@vicons/ionicons5";

    defineProps({
        goals: Array as PropType<GoalModel[]>,
    });
    const emit = defineEmits(["toggle", "delete"]);

    const columns = [
        {
            title: "Goal",
            key: "goal",
        },
        {
            title: "Status",
            key: "status",
            width: 90,
        },
        {
            title: "Deadline",
            key: "date",
            width: 220,
        },
        {
            title: "Delete",
            key: "delete",
            render(row: GoalModel) {
                return h(IconButton, { onClick: () => emit("delete", row), type: "error" }, () => h(Trash));
            },
            width: 80,
        },
        {
            title: "Created At",
            key: "created_at",
            width: 120,
        },
    ];
</script>

<template>
    <DataTable :columns="columns" :data="goals" :row-class-name="(row: GoalModel) => row.class" flex-height />
</template>
