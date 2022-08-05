<script setup lang="ts">
    import { onMounted, ref, watch } from "vue";
    import { useTickets } from "@store";
    import { Ticket } from "@types";
    import { TicketFilters, TicketForm } from "@components";
    import { Tickets } from "@common";

    const ticketStore = useTickets();
    ticketStore.$subscribe((_, state) => {
        tickets.value = state.tickets;
        filterTickets();
    });

    const tickets = ref<Ticket[]>(ticketStore.tickets);
    const filteredTickets = ref<Ticket[]>([]);
    const currentFilter = ref<number | string>(0);
    const formattedCategories = ticketStore.ticketCategories.map((obj) => {
        return {
            label: obj.category,
            value: obj.category_id,
        };
    });

    onMounted(() => {
        const allTickets = JSON.parse(JSON.stringify(ticketStore.tickets));
        filteredTickets.value = allTickets;
    });

    const setFilter = (filter: string | number) => (currentFilter.value = filter);

    const filterTickets = () => {
        switch (currentFilter.value) {
            case -2:
                filteredTickets.value = tickets.value.filter((obj) => obj.status === "Overdue");
                break;
            case -1:
                filteredTickets.value = tickets.value.filter((obj) => obj.status === "Today");
                break;
            case 0:
                filteredTickets.value = tickets.value;
                break;
            case 1:
                filteredTickets.value = tickets.value.filter((obj) => obj.is_focused);
                break;
            case 2:
                filteredTickets.value = tickets.value.filter((obj) => !obj.is_focused);
                break;
            default:
                filteredTickets.value = tickets.value.filter((obj) => obj.category_id === currentFilter.value);
                break;
        }
    };

    watch([currentFilter], () => {
        filterTickets();
    });
</script>

<template>
    <main class="tickets-page">
        <TicketFilters :count="filteredTickets.length" :categories="formattedCategories" @filter="setFilter" />
        <Tickets :tickets="filteredTickets" style="grid-area: 2 / 1 / 6 / 3" />
        <TicketForm :categories="formattedCategories" style="grid-area: 2 / 3 / 6 / 4" />
    </main>
</template>

<style lang="scss">
    .tickets-page {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(5, 1fr);
    }
</style>
