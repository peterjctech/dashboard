import { ipcMain } from "electron";
import { formatDate, openDB } from "../utils";
import { createEventModel, parseEventData } from "../services";
import { Event, EventProps } from "../types";
import dayjs from "dayjs";

ipcMain.handle("createEvent", async (_, props: EventProps) => {
    if (!props.event || !props.timestamp) return { warning: "You must input a timestamp and event" };
    const model = createEventModel(props);

    try {
        const db = await openDB();
        await db.run(
            "INSERT INTO events (event_id, event, description, timestamp, date, time) VALUES (?, ?, ?, ?, ?, ?)",
            [model.event_id, model.event, model.description, model.timestamp, model.date, model.time]
        );
        const data = parseEventData([model])[0];
        return { success: `Created event ${model.event}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create event" };
    }
});

ipcMain.handle("getEvents", async () => {
    try {
        const db = await openDB();
        const events = await db.all("SELECT * FROM events");
        const data = parseEventData(events);
        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get events" };
    }
});

ipcMain.handle("updateEvent", async (_, props: Event) => {
    const model = {
        ...props,
        date: formatDate(props.timestamp, "datetime"),
        timestamp: props.timestamp,
        time: dayjs.unix(props.timestamp).format("HH:mm"),
    };
    try {
        const db = await openDB();
        await db.run("UPDATE events SET timestamp = ?, date = ? WHERE event_id = ?", [
            model.timestamp,
            model.date,
            model.event_id,
        ]);
        const newModel = parseEventData([model])[0];
        return { help: `Updated event ${newModel.event}`, data: newModel };
    } catch (error) {
        console.log(error);
        return { error: "Failed to update event" };
    }
});

ipcMain.handle("deleteEvent", async (_, props: Event) => {
    try {
        const db = await openDB();
        await db.run("DELETE FROM events WHERE event_id = ?", props.event_id);
        return { info: `Deleted event ${props.event}`, data: props.event_id };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete event" };
    }
});
