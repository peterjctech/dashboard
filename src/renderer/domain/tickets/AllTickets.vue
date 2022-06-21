<script setup lang="ts">
    import { h, PropType, render } from "vue";
    import { TicketModel } from "@interfaces";
    import { IconButton } from "@components";
    import { Trash, Eye, EyeOff } from "@vicons/ionicons5";

    defineProps({
        tickets: Array as PropType<TicketModel[]>,
    });
    const emit = defineEmits(["toggle", "delete"]);

    const columns = [
        {
            title: "Toggle",
            key: "toggle",
            render(row: TicketModel) {
                return h(
                    IconButton,
                    { onClick: () => emit("toggle", row), type: row.is_toggled ? "warning" : "success" },
                    row.is_toggled ? () => h(EyeOff) : () => h(Eye)
                );
            },
            width: 80,
        },
        {
            title: "Category",
            key: "category",
            width: 200,
        },
        {
            title: "Ticket",
            key: "ticket",
        },
        {
            title: "Deadline",
            key: "date",
            width: 280,
        },
        {
            title: "Delete",
            key: "delete",
            render(row: TicketModel) {
                return h(IconButton, { onClick: () => emit("delete", row), type: "error" }, () => h(Trash));
            },
            width: 80,
        },
    ];
</script>

<template>
    <DataTable :columns="columns" :data="tickets" :row-class-name="(row: TicketModel) => row.class" flex-height />
</template>
