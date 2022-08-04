import { ipcMain } from "electron";
import { formatDate, openDB } from "../utils";
import { createTicketModel, parseTicketData } from "../services";
import { Ticket, TicketProps } from "../types";
import dayjs from "dayjs";

ipcMain.handle("createTicket", async (_, props: TicketProps) => {
    if (!props.ticket || !props.category_id) return { warning: "You must input a ticket and category" };
    const model = createTicketModel(props);

    try {
        const db = await openDB();
        await db.run(
            "INSERT INTO tickets (ticket_id, ticket, is_focused, timestamp, date, category_id) VALUES (?, ?, ?, ?, ?, ?)",
            [model.ticket_id, model.ticket, model.is_focused, model.timestamp, model.date, model.category_id]
        );
        const ticket = await db.get(
            "SELECT ticket_id, ticket, is_focused, timestamp, date, category_id, category, color FROM tickets INNER JOIN categories USING (category_id) WHERE ticket_id = ?",
            model.ticket_id
        );
        const data = parseTicketData([ticket])[0];
        return { success: `Created ticket ${data.ticket}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create ticket" };
    }
});

ipcMain.handle("getTickets", async () => {
    try {
        const db = await openDB();
        const tickets = await db.all(
            "SELECT ticket_id, ticket, is_focused, timestamp, date, category_id, category, color FROM tickets INNER JOIN categories USING (category_id)"
        );
        const data = parseTicketData(tickets);
        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get tickets" };
    }
});

ipcMain.handle("toggleTicket", async (_, props: Ticket) => {
    try {
        const db = await openDB();
        await db.run("UPDATE tickets SET is_focused = ? WHERE ticket_id = ?", [
            props.is_focused ? 0 : 1,
            props.ticket_id,
        ]);
        return {
            help: `Toggled ticket ${props.ticket}`,
            data: { ...props, is_focused: props.is_focused ? false : true },
        };
    } catch (error) {
        console.log(error);
        return { error: "Failed to toggle ticket" };
    }
});

ipcMain.handle("delayTicket", async (_, props: Ticket) => {
    const newDeadline = dayjs.unix(props.timestamp).add(1, "day");
    const model = { ...props, timestamp: newDeadline.unix(), date: formatDate(newDeadline, "shortdate") };

    try {
        const db = await openDB();
        await db.run("UPDATE tickets SET timestamp = ?, date = ? WHERE ticket_id = ?", [
            model.timestamp,
            model.date,
            model.ticket_id,
        ]);

        const newModel = await db.get(
            "SELECT ticket_id, ticket, is_focused, timestamp, date, category_id, category, color FROM tickets INNER JOIN categories USING (category_id) WHERE ticket_id = ?",
            model.ticket_id
        );

        const newTicket = parseTicketData([newModel])[0];
        return { help: `Delayed ticket ${newTicket.ticket}`, data: newTicket };
    } catch (error) {
        console.log(error);
        return { error: "Failed to toggle ticket" };
    }
});

ipcMain.handle("deleteTicket", async (_, props: Ticket) => {
    try {
        const db = await openDB();
        await db.run("DELETE FROM tickets WHERE ticket_id = ?", props.ticket_id);
        return { info: `Deleted ticket ${props.ticket}`, data: props.ticket_id };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete ticket" };
    }
});
