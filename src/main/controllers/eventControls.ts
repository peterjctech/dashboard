import dayjs from "dayjs";
import { ipcMain } from "electron";
import { getId, formatDateTime } from "../utils";
import { EventArgs, EventModel, RescheduleEventArgs } from "../interfaces";
import { createEvent, getEvents, getUpcomingEvents, updateEvent, rescheduleEvent, deleteEvent } from "../services";

ipcMain.handle("createEvent", async (_, args: EventArgs) => {
    if (!args.event) return { error: "Please fill out the form properly" };

    const combinedDate = args.date + args.minute * 60000 + args.hour * 3600000;

    const props = {
        event_id: getId(),
        event: args.event,
        description: args.description,
        timestamp: combinedDate / 1000,
        date: formatDateTime(dayjs(combinedDate)),
        category_id: args.category_id,
    };

    try {
        const data = await createEvent(props);
        return { success: `Created event ${props.event}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create event" };
    }
});

ipcMain.handle("getEvents", async () => {
    try {
        const data = await getEvents();
        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get events" };
    }
});

ipcMain.handle("getUpcomingEvents", async () => {
    try {
        const data = await getUpcomingEvents();
        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get upcoming events" };
    }
});

ipcMain.handle("updateEvent", async (_, args: EventModel) => {
    try {
        const data = await updateEvent(args);
        return { info: `Toggled event ${args.event}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to update event" };
    }
});

ipcMain.handle("rescheduleEvent", async (_, args: RescheduleEventArgs) => {
    const props = {
        event_id: args.event_id,
        event: args.event,
        timestamp: args.new_date / 1000,
        date: formatDateTime(dayjs(args.new_date)),
    };

    try {
        const data = await rescheduleEvent(props);
        return { info: `Rescheduled event ${args.event}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to reschedule event" };
    }
});

ipcMain.handle("deleteEvent", async (_, args: EventModel) => {
    try {
        const data = await deleteEvent(args);
        return { info: `Deleted event ${args.event}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete event" };
    }
});
