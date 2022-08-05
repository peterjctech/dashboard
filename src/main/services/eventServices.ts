import { Event, EventProps, EventModel } from "../types";
import { getId, formatDate } from "../utils";
import dayjs from "dayjs";

export const parseEventData = (events: EventModel[]) => {
    const now = dayjs().unix();
    const date = dayjs().endOf("day");
    const endOfToday = date.unix();
    const endOfTomorrow = date.add(1, "day").unix();
    const soon = date.add(6, "day").unix();

    const data: Event[] = [];

    for (let i = 0; i < events.length; i++) {
        let status = "None";
        let color = "green";

        if (now > events[i].timestamp) {
            status = "Passed";
            color = "red";
        } else if (endOfToday >= events[i].timestamp) {
            status = "Today";
            color = "orange";
        } else if (endOfTomorrow >= events[i].timestamp) {
            status = "Tomorrow";
            color = "yellow";
        } else if (soon > events[i].timestamp) {
            const eventDate = dayjs.unix(events[i].timestamp);
            status = `This ${eventDate.format("dddd")}`;
            color = "blue";
        }

        data.push({ ...events[i], color, status });
    }

    return data;
};

export const createEventModel = (props: EventProps) => {
    const model: EventModel = {
        event_id: getId(),
        event: props.event,
        description: props.description,
        timestamp: props.timestamp,
        date: formatDate(props.timestamp, "datetime"),
        time: dayjs.unix(props.timestamp).format("HH:mm"),
    };

    return model;
};
