import { ReminderProps, ReminderModel } from "../types";
import { getId } from "../utils";
import dayjs from "dayjs";

export const createReminderModel = (props: ReminderProps) => {
    let desiredTime;

    if (props.isRelative) {
        desiredTime = dayjs().add(props.hour, "hour").add(props.minute, "minute");
    } else {
        desiredTime = dayjs().hour(props.hour).minute(props.minute);
        if (desiredTime.unix() < dayjs().unix()) desiredTime = desiredTime.add(1, "day");
    }

    const model: ReminderModel = {
        reminder_id: getId(),
        reminder: props.reminder,
        timestamp: desiredTime.unix(),
        time: desiredTime.format("HH:mm"),
    };

    return model;
};
