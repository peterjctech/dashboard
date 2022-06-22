import dayjs from "dayjs";
import { openDB } from "../utils";
import { EventProps, EventModel, RescheduleEventProps } from "../../interfaces";

export const getEvents = async () => {
    const db = await openDB();
    const data = await db.all(
        "SELECT event_id, event, description, timestamp, date, category_id, category, class FROM events INNER JOIN event_categories USING (category_id)"
    );
    return data;
};

export const getUpcomingEvents = async () => {
    const db = await openDB();
    const currentTime = dayjs().unix();
    const endOfDay = dayjs().endOf("day").unix();
    const inOneWeek = dayjs().add(7, "day").unix();

    const events = await db.all(
        "SELECT event_id, event, description, timestamp, date, category_id, category, class FROM events INNER JOIN event_categories USING (category_id) WHERE timestamp < ?",
        inOneWeek
    );

    const data = events.map((obj) => {
        let status_class = obj.class;
        if (currentTime > obj.timestamp) {
            status_class = "red";
        } else if (endOfDay >= obj.timestamp) {
            status_class = "yellow";
        } else {
            status_class = "green";
        }

        return { ...obj, status_class };
    });

    data.sort((a, b) => a.timestamp - b.timestamp);
    return data;
};

export const createEvent = async (props: EventProps) => {
    const db = await openDB();
    await db.run(
        "INSERT INTO events (event_id, event, description, timestamp, date, category_id) VALUES (?, ?, ?, ?, ?, ?)",
        [props.event_id, props.event, props.description, props.timestamp, props.date, props.category_id]
    );
    const data = await db.get(
        "SELECT event_id, event, description, timestamp, date, category_id, category, class FROM events INNER JOIN event_categories USING (category_id) WHERE event_id = ?",
        props.event_id
    );
    return data;
};

export const updateEvent = async (args: EventModel) => {
    const db = await openDB();
    await db.run("UPDATE events SET event = ?, description = ?, category_id = ? WHERE event_id = ?", [
        args.event,
        args.description,
        args.category_id,
        args.event_id,
    ]);
    return args;
};

export const rescheduleEvent = async (args: RescheduleEventProps) => {
    const db = await openDB();
    await db.run("UPDATE events SET date = ?, timestamp = ? WHERE event_id = ?", [
        args.date,
        args.timestamp,
        args.event_id,
    ]);
    return args;
};

export const deleteEvent = async (args: EventModel) => {
    const db = await openDB();
    await db.run("DELETE FROM events WHERE event_id = ?", args.event_id);
    return args.event_id;
};
