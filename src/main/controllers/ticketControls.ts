import dayjs from "dayjs";
import { ipcMain } from "electron";
import { getId, formatDate } from "../utils";
import { TicketArgs, TicketModel } from "../interfaces";
import { createTicket, getTickets, getFocusedTickets, toggleTicket, deleteTicket } from "../services";

ipcMain.handle("createTicket", async (_, args: TicketArgs) => {
    if (!args.ticket || !args.category_id) return { error: "Please fill out the form properly" };

    const deadline = args.deadline || 0;
    const now = dayjs();

    const dueDate = now.add(deadline, "day").endOf("day");

    const props = {
        ticket_id: getId(),
        ticket: args.ticket,
        is_focused: 0,
        timestamp: dueDate.unix(),
        date: formatDate(dueDate),
        category_id: args.category_id,
    };

    try {
        const data = await createTicket(props);
        return { success: `Created ticket ${props.ticket}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create ticket" };
    }
});

ipcMain.handle("getTickets", async () => {
    try {
        const data = await getTickets();
        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get tickets" };
    }
});

ipcMain.handle("getFocusedTickets", async () => {
    try {
        const data = await getFocusedTickets();
        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get toggled tickets" };
    }
});

ipcMain.handle("toggleTicket", async (_, args: TicketModel) => {
    const toggle = args.is_focused === 0 ? 1 : 0;
    try {
        const data = await toggleTicket(args, toggle);
        return { info: `Toggled ticket ${args.ticket}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to update ticket" };
    }
});

ipcMain.handle("deleteTicket", async (_, args: TicketModel) => {
    try {
        const data = await deleteTicket(args);
        return { info: `Deleted ticket ${args.ticket}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete ticket" };
    }
});
