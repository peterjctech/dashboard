import { defineStore } from "pinia";
import { invoke } from "@helpers";
import { Ticket, Category, TicketProps, CategoryProps } from "@types";

interface TicketStoreState {
    tickets: Ticket[];
    ticketCategories: Category[];
}

const useTickets = defineStore("ticketStore", {
    state: (): TicketStoreState => {
        return {
            tickets: [],
            ticketCategories: [],
        };
    },
    actions: {
        async initStore() {
            const tickets: Ticket[] = await invoke("getTickets");
            const ticketCategories: Category[] = await invoke("getCategories", { for: "Tickets" });

            this.tickets = tickets;
            this.ticketCategories = ticketCategories;

            this.sortTickets();
        },
        async createTicketCategory(props: CategoryProps) {
            const response: Category = await invoke("createCategory", props);
            if (response) this.ticketCategories.push(response);
        },
        async updateTicketCategory(props: Category) {
            const response: Category = await invoke("updateCategory", props);
            this.ticketCategories = this.ticketCategories.map((obj) => {
                return obj.category_id === response.category_id ? response : obj;
            });
        },
        async deleteTicketCategory(props: Category) {
            const response: string = await invoke("deleteCategory", props);
            this.ticketCategories = this.ticketCategories.filter((obj) => obj.category_id !== response);
        },
        async createTicket(props: TicketProps) {
            const response: Ticket = await invoke("createTicket", props);
            if (response) {
                this.tickets.push(response);
                this.sortTickets();
            }
        },
        async toggleTicket(props: Ticket) {
            const response: Ticket = await invoke("toggleTicket", props);
            if (response) {
                this.tickets = this.tickets.map((obj) => {
                    return obj.ticket_id === response.ticket_id ? response : obj;
                });
            }
        },
        async delayTicket(props: Ticket) {
            const response: Ticket = await invoke("delayTicket", props);
            if (response) {
                this.tickets = this.tickets.map((obj) => {
                    return obj.ticket_id === response.ticket_id ? response : obj;
                });
                this.sortTickets();
            }
        },
        async deleteTicket(props: Ticket) {
            const response: string = await invoke("deleteTicket", props);
            this.tickets = this.tickets.filter((obj) => obj.ticket_id !== response);
        },
        sortTickets() {
            this.tickets = this.tickets.sort((a, b) => a.timestamp - b.timestamp);
        },
    },
});

export default useTickets;
