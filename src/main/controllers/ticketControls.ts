import { ipcMain } from "electron";
import { getId, openDB, formatDate } from "../utils";
import { TicketArgs, TicketModel } from "../interfaces";
import dayjs from "dayjs";

const parseTicketData = (tickets: TicketModel[]) => {
    const currentTime = dayjs().unix();
    const endOfDay = dayjs().endOf("day").unix();

    const data = tickets.map((obj) => {
        let status = "";
        let rowClass = obj.class;
        if (currentTime > obj.timestamp) {
            status = "Passed";
            rowClass += " error";
        } else if (endOfDay >= obj.timestamp) {
            status = "Today";
            rowClass += " success";
        }

        return { ...obj, class: rowClass, status };
    });
    data.sort((a, b) => a.timestamp - b.timestamp);

    return data;
};

ipcMain.handle("createTicket", async (_, args: TicketArgs) => {
    if (!args.ticket) return { error: "Please fill out the form properly" };

    const deadline = args.deadline || 0;
    const now = dayjs();

    const dueDate = now.add(deadline, "day").endOf("day");

    const props = {
        ticket_id: getId(),
        ticket: args.ticket,
        is_focused: 0,
        timestamp: dueDate.unix(),
        date: formatDate(dueDate),
        category_id: args.category_id || null,
    };

    try {
        const db = await openDB();
        await db.run(
            "INSERT INTO tickets (ticket_id, ticket, is_focused, timestamp, date, category_id) VALUES (?, ?, ?, ?, ?, ?)",
            [props.ticket_id, props.ticket, props.is_focused, props.timestamp, props.date, props.category_id]
        );

        const tickets = await db.all(
            "SELECT ticket_id, ticket, is_focused, timestamp, date, category_id, category, class FROM tickets INNER JOIN ticket_categories USING (category_id)"
        );
        const data = parseTicketData(tickets);

        return { success: `Created ticket ${props.ticket}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create ticket" };
    }
});

ipcMain.handle("getTickets", async () => {
    try {
        const db = await openDB();
        const tickets = await db.all(
            "SELECT ticket_id, ticket, is_focused, timestamp, date, category_id, category, class FROM tickets INNER JOIN ticket_categories USING (category_id)"
        );
        const data = parseTicketData(tickets);

        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get tickets" };
    }
});

ipcMain.handle("getToggledTickets", async () => {
    try {
        const db = await openDB();
        const tickets = await db.all(
            "SELECT ticket_id, ticket, is_focused, timestamp, date, category_id, category, class FROM tickets INNER JOIN ticket_categories USING (category_id) WHERE is_focused = 1"
        );
        const data = parseTicketData(tickets);

        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get toggled tickets" };
    }
});

ipcMain.handle("toggleTicket", async (_, args: TicketModel) => {
    const toggle = args.is_focused === 0 ? 1 : 0;
    try {
        const db = await openDB();
        await db.run("UPDATE tickets SET is_focused = ? WHERE ticket_id = ?", [toggle, args.ticket_id]);

        return { info: `Toggled ticket ${args.ticket}`, data: { ...args, is_focused: toggle } };
    } catch (error) {
        console.log(error);
        return { error: "Failed to update ticket" };
    }
});

ipcMain.handle("deleteTicket", async (_, args: TicketModel) => {
    try {
        const db = await openDB();
        await db.run("DELETE FROM tickets WHERE ticket_id = ?", args.ticket_id);

        return { info: `Deleted ticket ${args.ticket}`, data: args.ticket_id };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete ticket" };
    }
});
