<script setup lang="ts">
    import { onMounted, ref, watch } from "vue";
    import { invoke } from "@helpers";
    import { TicketModel, TicketArgs, TicketCategoryModel } from "@interfaces";
    import { AllTickets, TicketForm } from "@domain";

    const tickets = ref();
    const categories: any = ref([]);
    const filteredTickets = ref([]);
    const filter = ref<number | string>(2);
    const formattedCategories = ref([]);

    onMounted(async () => {
        const response = await invoke("getTickets");
        tickets.value = response;
        filteredTickets.value = response;
        categories.value = await invoke("getTicketCategories");
        formattedCategories.value = categories.value.map((obj: TicketCategoryModel) => {
            return {
                label: obj.category,
                value: obj.category_id,
            };
        });
    });

    const createTicket = async (args: TicketArgs) => {
        const response = await invoke("createTicket", args);
        if (response) tickets.value = response;
    };

    const toggleTicket = async (args: TicketArgs) => {
        const response = await invoke("toggleTicket", args);
        if (response) {
            tickets.value = tickets.value.map((obj: TicketModel) => {
                return obj.ticket_id === response.ticket_id ? response : obj;
            });
        }
    };
    const deleteTicket = async (args: TicketModel) => {
        const response = await invoke("deleteTicket", args);
        tickets.value = tickets.value.filter((obj: TicketModel) => obj.ticket_id !== response);
    };

    watch(filter, (filter) => {
        switch (filter) {
            case -2:
                filteredTickets.value = tickets.value.filter((obj: TicketModel) => obj.status === "Passed");
                break;
            case -1:
                filteredTickets.value = tickets.value.filter((obj: TicketModel) => obj.status === "Today");
                break;
            case 0:
                filteredTickets.value = tickets.value.filter((obj: TicketModel) => obj.is_focused === 0);
                break;
            case 1:
                filteredTickets.value = tickets.value.filter((obj: TicketModel) => obj.is_focused === 1);
                break;
            case 2:
                filteredTickets.value = tickets.value;
                break;
            default:
                filteredTickets.value = tickets.value.filter((obj: TicketModel) => {
                    return obj.category_id === filter;
                });
                break;
        }
    });
</script>

<template>
    <main class="tickets-page">
        <section>
            <h5 class="count">{{ filteredTickets.length }} tickets remaining</h5>
            <div class="filters">
                <Button @click="filter = -2" type="warning">Deadline Passed</Button>
                <Button @click="filter = -1" type="success">Deadline Today</Button>
                <Button @click="filter = 1" type="primary">Focused</Button>
                <Button @click="filter = 0" type="info">Unfocused</Button>
                <Button @click="filter = 2" type="error">Reset Filter</Button>
            </div>
            <div class="filters">
                <Button v-for="category in categories" @click="filter = category.category_id" type="info">
                    {{ category.category }}
                </Button>
            </div>
        </section>
        <AllTickets :tickets="filteredTickets" @toggle="toggleTicket" @delete="deleteTicket" />
        <TicketForm :categories="formattedCategories" @create="createTicket" />
    </main>
</template>

<style lang="scss">
    .tickets-page {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(5, 1fr);
        gap: 2rem;

        .count {
            color: $neutral-light;
            position: absolute;
            top: 2rem;
            right: 2rem;
        }

        .filters {
            display: flex;

            button {
                margin: 1rem;
            }
        }

        > :nth-child(1) {
            grid-area: 1 / 1 / 2 / 4;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
        }
        > :nth-child(2) {
            grid-area: 2 / 1 / 6 / 3;
        }
        > :nth-child(3) {
            grid-area: 2 / 3 / 6 / 4;
        }
    }
</style>
