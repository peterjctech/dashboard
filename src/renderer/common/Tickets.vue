<script setup lang="ts">
    import { PropType } from "vue";
    import { useDataTable } from "@hooks";
    import { useTickets } from "@store";
    import { Ticket } from "@types";
    import { ArrowForward, Eye, EyeOff, Trash } from "@vicons/ionicons5";

    defineProps({
        tickets: Array as PropType<Ticket[]>,
        focused: {
            type: Boolean,
            default: false,
        },
    });

    const ticketStore = useTickets();

    const focusedColumns = [
        useDataTable.icon({
            title: "Toggle",
            type: "warning",
            click: (row: Ticket) => ticketStore.toggleTicket(row),
            icon: EyeOff,
        }),
        { title: "Ticket", key: "ticket" },
    ];
    const columns = [
        useDataTable.conditionalIcon({
            title: "Toggle",
            types: ["warning", "success"],
            click: (row: Ticket) => ticketStore.toggleTicket(row),
            icons: [EyeOff, Eye],
            condition: "is_focused",
        }),
        { title: "Category", key: "category", width: 200 },
        { title: "Ticket", key: "ticket" },
        { title: "Deadline", key: "date", width: 200 },
        useDataTable.icon({
            title: "Delay",
            type: "info",
            click: (row: Ticket) => ticketStore.delayTicket(row),
            icon: ArrowForward,
        }),
        useDataTable.icon({
            title: "Delete",
            type: "error",
            click: (row: Ticket) => ticketStore.deleteTicket(row),
            icon: Trash,
        }),
    ];
</script>

<template>
    <DataTable
        :data="tickets"
        :columns="focused ? focusedColumns : columns"
        :row-class-name="(row: Ticket) => row.color"
        flex-height
    />
</template>
