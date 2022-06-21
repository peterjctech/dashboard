import { ipcMain } from "electron";
import { getId, openDB, formatDate } from "../utils";
import { HabitArgs, HabitModel } from "../interfaces";
import dayjs from "dayjs";

ipcMain.handle("createHabit", async (_, args: HabitArgs) => {
    if (!args.habit || !args.margin) return { error: "Please fill out the form properly" };

    const now = dayjs();
    const timestamp = now.unix();

    const props = {
        habit_id: getId(),
        habit: args.habit,
        margin: args.margin,
        last_completed: timestamp,
        last_broken: timestamp,
        timestamp: timestamp,
        class: args.class ? args.class : "light",
        created_at: formatDate(now),
    };

    try {
        const db = await openDB();
        await db.run(
            "INSERT INTO habits (habit_id, habit, margin, last_completed, last_broken, timestamp, class, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
                props.habit_id,
                props.habit,
                props.margin,
                props.last_completed,
                props.last_broken,
                props.timestamp,
                props.class,
                props.created_at,
            ]
        );

        return { success: `Created habit ${props.habit}`, data: props };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create habit" };
    }
});

ipcMain.handle("getHabits", async () => {
    try {
        const db = await openDB();
        const data = await db.all("SELECT * FROM habits");

        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get habits" };
    }
});

ipcMain.handle("updateHabit", async (_, args: HabitModel) => {
    try {
        const db = await openDB();
        await db.run("UPDATE habits SET habit = ?, margin = ?, class = ? WHERE habit_id = ?", [
            args.habit,
            args.margin,
            args.class,
            args.habit_id,
        ]);
        return { info: `Updated habit ${args.habit}`, data: args };
    } catch (error) {
        console.log(error);
        return { error: "Failed to update habit" };
    }
});

ipcMain.handle("deleteHabit", async (_, args: HabitModel) => {
    try {
        const db = await openDB();
        await db.run("DELETE FROM habits WHERE habit_id = ?", args.habit_id);

        return { info: `Deleted habit ${args.habit}`, data: args.habit_id };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete habit" };
    }
});
