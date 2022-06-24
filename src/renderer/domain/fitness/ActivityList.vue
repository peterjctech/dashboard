<script setup lang="ts">
    import { h, PropType } from "vue";
    import { ActivityModel } from "@interfaces";
    import { IconButton } from "@components";
    import { Eye } from "@vicons/ionicons5";

    defineProps({
        activities: Array as PropType<ActivityModel[]>,
    });
    const emit = defineEmits(["view"]);

    const columns = [
        {
            title: "Activity",
            key: "activity",
        },
        {
            title: "View",
            key: "view",
            render(row: ActivityModel) {
                return h(IconButton, { onClick: () => emit("view", row.activity_id), type: "success" }, () => h(Eye));
            },
            width: 80,
        },
    ];
</script>

<template>
    <DataTable :columns="columns" :data="activities" :row-class-name="(row: ActivityModel) => row.class" flex-height />
</template>
