import dayjs from "dayjs";
import { openDB } from "../utils";
import { TicketProps, TicketModel } from "../interfaces";

const parseTicketData = (tickets: TicketModel[]) => {
    const endOfYesterday = dayjs().endOf("day").subtract(1, "day").unix();
    const endOfToday = dayjs().endOf("day").unix();

    const data = tickets.map((obj) => {
        let status = "";
        let rowClass = obj.class;
        if (endOfYesterday > obj.timestamp) {
            status = "Passed";
            rowClass += " error";
        } else if (endOfToday >= obj.timestamp) {
            status = "Today";
            rowClass += " success";
        }

        return { ...obj, class: rowClass, status };
    });
    data.sort((a, b) => a.timestamp - b.timestamp);

    return data;
};

export const getTickets = async () => {
    const db = await openDB();
    const tickets = await db.all(
        "SELECT ticket_id, ticket, is_focused, timestamp, date, category_id, category, class FROM tickets INNER JOIN ticket_categories USING (category_id)"
    );

    const data = parseTicketData(tickets);
    return data;
};

export const createTicket = async (props: TicketProps) => {
    const db = await openDB();
    await db.run(
        "INSERT INTO tickets (ticket_id, ticket, is_focused, timestamp, date, category_id) VALUES (?, ?, ?, ?, ?, ?)",
        [props.ticket_id, props.ticket, props.is_focused, props.timestamp, props.date, props.category_id]
    );

    const tickets = await db.all(
        "SELECT ticket_id, ticket, is_focused, timestamp, date, category_id, category, class FROM tickets INNER JOIN ticket_categories USING (category_id)"
    );
    const data = parseTicketData(tickets);
    return data;
};

export const getFocusedTickets = async () => {
    const db = await openDB();
    const tickets = await db.all(
        "SELECT ticket_id, ticket, is_focused, timestamp, date, category_id, category, class FROM tickets INNER JOIN ticket_categories USING (category_id) WHERE is_focused = 1"
    );
    const data = parseTicketData(tickets);
    return data;
};

export const toggleTicket = async (args: TicketModel, toggle: number) => {
    const db = await openDB();
    await db.run("UPDATE tickets SET is_focused = ? WHERE ticket_id = ?", [toggle, args.ticket_id]);
    const data = { ...args, is_focused: toggle };
    return data;
};

export const deleteTicket = async (args: TicketModel) => {
    const db = await openDB();
    await db.run("DELETE FROM tickets WHERE ticket_id = ?", args.ticket_id);
    return args.ticket_id;
};
