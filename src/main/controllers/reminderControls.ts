import { ipcMain } from "electron";
import { ReminderModel, ReminderArgs } from "../interfaces";
import { getId, formatDateTime, openDB } from "../utils";
import { getReminders, createReminder, deleteReminder } from "../services";
import dayjs from "dayjs";

ipcMain.handle("createReminder", async (_, args: ReminderArgs) => {
    if (!args.reminder) return { error: "Please fill out the form properly" };

    let timestamp;
    let time;

    if (args.type === "Absolute") {
        const minuteOfDay = dayjs().hour() * 60 + dayjs().minute();
        const desiredMinute = args.hour * 60 + args.minute;
        const startingDay = desiredMinute > minuteOfDay ? dayjs() : dayjs().add(1, "day");
        timestamp = startingDay.hour(args.hour).minute(args.minute).second(0).unix();
        time = `${args.hour}:${args.minute}`;
    } else {
        const desiredTime = dayjs().add(args.hour, "hour").add(args.minute, "minute");
        timestamp = desiredTime.unix();
        time = desiredTime.format("HH:mm");
    }

    const props = {
        reminder_id: getId(),
        reminder: args.reminder,
        timestamp,
        time,
    };

    try {
        const data = await createReminder(props);
        return { success: `Created reminder ${props.reminder}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create reminder" };
    }
});

ipcMain.handle("getReminders", async () => {
    try {
        const data = await getReminders();
        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get reminders" };
    }
});

ipcMain.handle("deleteReminder", async (_, args: ReminderModel) => {
    try {
        const data = await deleteReminder(args);
        return { info: `Deleted reminder ${args.reminder}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete reminder" };
    }
});

ipcMain.handle("clearReminders", async (_, args) => {
    try {
        const db = await openDB();
        await db.exec("DROP TABLE reminders");
        await db.exec(
            "CREATE TABLE reminders (reminder_id TEXT PRIMARY KEY, reminder TEXT, timestamp INTEGER, time TEXT)"
        );
        return { info: `Deleted all reminders` };
    } catch (error) {
        console.log(error);
        return { error: "Failed to clear reminders" };
    }
});
