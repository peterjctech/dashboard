<script setup lang="ts">
    import { useTrophy } from "@store";
    import { Category } from "@types";
    import { EyeOff, Eye } from "@vicons/ionicons5";
    import { h } from "vue";
    import { Icon } from "@common";

    const trophyStore = useTrophy();

    const props = defineProps({
        selected: {
            type: String || null,
            default: null,
        },
    });
    const emit = defineEmits(["select"]);

    const columns = [
        {
            title: "Select",
            key: "select",
            render(row: Category) {
                return h(
                    Icon,
                    {
                        onClick: () => {
                            emit("select", row);
                        },
                        type: row.category_id === props.selected ? "warning" : "success",
                    },
                    () => h(row.category_id === props.selected ? EyeOff : Eye)
                );
            },
            width: 80,
        },
        { title: "Type", key: "category" },
    ];
</script>

<template>
    <DataTable
        :data="trophyStore.achievementTypes"
        :columns="columns"
        :row-class-name="(row: Category) => row.color"
        flex-height
    />
</template>
