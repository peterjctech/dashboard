import dayjs from "dayjs";
import { openDB } from "../utils";
import { EventProps, EventModel } from "../interfaces";

const parseEvents = (events: EventProps[]) => {
    const now = dayjs().unix();
    const endOfDay = dayjs().endOf("day").unix();
    const threshold = dayjs().endOf("day").add(6, "day").unix();

    const data = events.map((obj) => {
        let status = "";
        let eventClass = "pink";
        const eventDate = dayjs.unix(obj.timestamp);

        if (now > obj.timestamp) {
            status = "Passed";
            eventClass = "red";
        } else if (endOfDay > obj.timestamp) {
            status = "Later today";
            eventClass = "yellow";
        } else if (threshold > obj.timestamp) {
            status = `This ${eventDate.format("dddd")}`;
            eventClass = "green";
        }

        return { ...obj, status, class: eventClass };
    });

    data.sort((a, b) => a.timestamp - b.timestamp);
    return data;
};

export const getEvents = async () => {
    const db = await openDB();
    const events = await db.all("SELECT * FROM events");
    const data = parseEvents(events);
    return data;
};

export const getUpcomingEvents = async () => {
    const db = await openDB();
    const threshold = dayjs().endOf("day").add(6, "day").unix();
    const events = await db.all("SELECT * FROM events WHERE timestamp < ?", threshold);
    const data = parseEvents(events);
    return data;
};

export const createEvent = async (props: EventProps) => {
    const db = await openDB();
    await db.run("INSERT INTO events (event_id, event, description, timestamp, date) VALUES (?, ?, ?, ?, ?)", [
        props.event_id,
        props.event,
        props.description,
        props.timestamp,
        props.date,
    ]);
    const data = await getEvents();
    return data;
};

export const updateEvent = async (args: EventModel) => {
    const db = await openDB();
    await db.run("UPDATE events SET event = ?, description = ? WHERE event_id = ?", [
        args.event,
        args.description,
        args.event_id,
    ]);
    const data = parseEvents([args]);
    return data[0];
};

// export const rescheduleEvent = async (args: RescheduleEventProps) => {
//     const db = await openDB();
//     await db.run("UPDATE events SET date = ?, timestamp = ? WHERE event_id = ?", [
//         args.date,
//         args.timestamp,
//         args.event_id,
//     ]);
//     return args;
// };

export const deleteEvent = async (args: EventModel) => {
    const db = await openDB();
    await db.run("DELETE FROM events WHERE event_id = ?", args.event_id);
    return args.event_id;
};
