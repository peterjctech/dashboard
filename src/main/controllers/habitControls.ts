import { ipcMain } from "electron";
import { openDB } from "../utils";
import { createHabitModel, parseHabitData } from "../services";
import { Habit, HabitProps } from "../types";
import dayjs from "dayjs";

ipcMain.handle("createHabit", async (_, props: HabitProps) => {
    if (!props.habit || !props.frequency) return { warning: "You must input a habit and frequency" };
    const model = createHabitModel(props);

    try {
        const db = await openDB();
        await db.run(
            "INSERT INTO habits (habit_id, habit, frequency, last_completed, last_broken, next_due) VALUES (?, ?, ?, ?, ?, ?)",
            [model.habit_id, model.habit, model.frequency, model.last_completed, model.last_broken, model.next_due]
        );

        const data = parseHabitData([model])[0];
        return { success: `Created habit ${data.habit}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create habit" };
    }
});

ipcMain.handle("getHabits", async () => {
    try {
        const db = await openDB();
        const habits = await db.all("SELECT * FROM habits");
        for (let i = 0; i < habits.length; i++) {
            if (habits[i].next_due <= dayjs().unix()) {
                await db.run("UPDATE habits SET last_broken = ? WHERE habit_id = ?", [
                    dayjs().unix(),
                    habits[i].habit_id,
                ]);
            }
        }
        const habits2 = await db.all("SELECT * FROM habits");
        const data = parseHabitData(habits2);
        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get habits" };
    }
});

ipcMain.handle("checkHabit", async (_, props: Habit) => {
    try {
        const db = await openDB();
        const now = dayjs().unix();
        const newModel: Habit = {
            ...props,
            last_broken: props.next_due < now ? now : props.last_broken,
            last_completed: now,
            next_due: dayjs().endOf("day").add(props.frequency, "day").unix(),
        };

        await db.run("UPDATE habits SET last_completed = ?, last_broken = ?, next_due = ? WHERE habit_id = ?", [
            newModel.last_completed,
            newModel.last_broken,
            newModel.next_due,
            newModel.habit_id,
        ]);

        return { help: `Checked habit ${newModel.habit}`, data: newModel };
    } catch (error) {
        console.log(error);
        return { error: "Failed to check habit" };
    }
});

ipcMain.handle("deleteHabit", async (_, props: Habit) => {
    try {
        const db = await openDB();
        await db.run("DELETE FROM habits WHERE habit_id = ?", props.habit_id);
        return { info: `Deleted habit ${props.habit}`, data: props.habit_id };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete habit" };
    }
});
