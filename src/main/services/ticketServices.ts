import { TicketProps, TicketModel, Ticket } from "../types";
import { getId, formatDate } from "../utils";
import dayjs from "dayjs";

interface TicketData {
    ticket_id: string;
    ticket: string;
    is_focused: number;
    timestamp: number;
    date: string;
    category_id: string;
    category: string;
    color: string;
}

export const parseTicketData = (tickets: TicketData[]) => {
    const date = dayjs().endOf("day");
    const endOfYesterday = date.subtract(1, "day").unix();
    const endOfToday = date.unix();

    const data: Ticket[] = [];

    for (let i = 0; i < tickets.length; i++) {
        let status = "";
        let color = tickets[i].color;

        if (endOfYesterday > tickets[i].timestamp) {
            status = "Overdue";
            color += " error";
        } else if (endOfToday >= tickets[i].timestamp) {
            status = "Today";
            color += " success";
        }

        data.push({ ...tickets[i], color, status, is_focused: tickets[i].is_focused === 1 ? true : false });
    }

    return data;
};

export const createTicketModel = (props: TicketProps) => {
    const due = dayjs().add(props.deadline, "day").endOf("day");

    const model: TicketModel = {
        ticket_id: getId(),
        ticket: props.ticket,
        is_focused: 0,
        timestamp: due.unix(),
        date: formatDate(due, "shortdate"),
        category_id: props.category_id,
    };

    return model;
};
