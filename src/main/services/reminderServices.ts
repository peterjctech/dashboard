import { ReminderModel, ReminderProps } from "../interfaces";
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

export const getReminders = async () => {
    const db = await openDB();
    const data = await db.all("SELECT * FROM reminders");
    return data;
};

export const deleteReminder = async (args: ReminderModel) => {
    const db = await openDB();
    await db.run("DELETE FROM reminders WHERE reminder_id = ?", args.reminder_id);
    return args.reminder_id;
};
