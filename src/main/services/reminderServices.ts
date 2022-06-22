import { ReminderProps } from "../interfaces";
import { openDB } from "../utils";

export const createReminder = async (props: ReminderProps) => {
    const db = await openDB();
    await db.run("INSERT INTO reminders (reminder_id, reminder, timestamp, time) VALUES (?, ?, ?, ?)", [
        props.reminder_id,
        props.reminder,
        props.timestamp,
        props.time,
    ]);

    return props;
};
