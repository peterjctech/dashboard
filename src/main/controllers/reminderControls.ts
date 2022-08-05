import { ipcMain } from "electron";
import { openDB } from "../utils";
import { createReminderModel } from "../services";
import { Reminder, ReminderProps } from "../types";

ipcMain.handle("createReminder", async (_, props: ReminderProps) => {
    if (!props.reminder) return { warning: "You must input a reminder" };
    const model = createReminderModel(props);

    try {
        const db = await openDB();
        await db.run("INSERT INTO reminders (reminder_id, reminder, timestamp, time) VALUES (?, ?, ?, ?)", [
            model.reminder_id,
            model.reminder,
            model.timestamp,
            model.time,
        ]);

        return { success: `Created reminder ${model.reminder}`, data: model };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create reminder" };
    }
});

ipcMain.handle("getReminders", async () => {
    try {
        const db = await openDB();
        const data = await db.all("SELECT * FROM reminders");
        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get reminders" };
    }
});

ipcMain.handle("deleteReminder", async (_, props: Reminder) => {
    try {
        const db = await openDB();
        await db.run("DELETE FROM reminders WHERE reminder_id = ?", props.reminder_id);
        return { info: `Deleted reminder ${props.reminder}`, data: props.reminder_id };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete reminder" };
    }
});
