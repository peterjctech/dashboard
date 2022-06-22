import { ipcMain } from "electron";
import { getId, formatDate } from "../utils";
import { HabitArgs, HabitModel } from "../../interfaces";
import { createHabit, getHabits, updateHabit, deleteHabit } from "../services";
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
        const data = await createHabit(props);
        return { success: `Created habit ${props.habit}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create habit" };
    }
});

ipcMain.handle("getHabits", async () => {
    try {
        const data = await getHabits();
        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get habits" };
    }
});

ipcMain.handle("updateHabit", async (_, args: HabitModel) => {
    try {
        const data = await updateHabit(args);
        return { info: `Updated habit ${args.habit}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to update habit" };
    }
});

ipcMain.handle("deleteHabit", async (_, args: HabitModel) => {
    try {
        const data = await deleteHabit(args);
        return { info: `Deleted habit ${args.habit}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete habit" };
    }
});
