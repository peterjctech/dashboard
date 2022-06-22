<script setup lang="ts">
    import { h, ref, onMounted } from "vue";
    import { TicketModel } from "@interfaces";
    import { IconButton } from "@components";
    import { Trash, Eye, EyeOff } from "@vicons/ionicons5";
    import { invoke } from "@helpers";

    const tickets = ref();

    onMounted(async () => {
        tickets.value = await invoke("getFocusedTickets");
    });

    const columns = [
        {
            title: "Toggle",
            key: "toggle",
            render(row: TicketModel) {
                return h(
                    IconButton,
                    {
                        onClick: async () => {
                            const response = await invoke("toggleTicket", row);
                            tickets.value = tickets.value.filter(
                                (obj: TicketModel) => obj.ticket_id !== response.ticket_id
                            );
                        },
                        type: row.is_focused ? "warning" : "success",
                    },
                    row.is_focused ? () => h(EyeOff) : () => h(Eye)
                );
            },
            width: 80,
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
                return h(
                    IconButton,
                    {
                        onClick: async () => {
                            const response = await invoke("deleteTicket", row);
                            tickets.value = tickets.value.filter((obj: TicketModel) => obj.ticket_id !== response);
                        },
                        type: "error",
                    },
                    () => h(Trash)
                );
            },
            width: 80,
        },
    ];
</script>

<template>
    <DataTable :columns="columns" :data="tickets" :row-class-name="(row: TicketModel) => row.class" flex-height />
</template>
