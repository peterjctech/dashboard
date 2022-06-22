import { openDB } from "../utils";
import { HabitProps, HabitModel } from "../../interfaces";

export const getHabits = async () => {
    const db = await openDB();
    const data = await db.all("SELECT * FROM habits");
    return data;
};

export const createHabit = async (props: HabitProps) => {
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
    return props;
};

export const updateHabit = async (args: HabitModel) => {
    const db = await openDB();
    await db.run("UPDATE habits SET habit = ?, margin = ?, class = ? WHERE habit_id = ?", [
        args.habit,
        args.margin,
        args.class,
        args.habit_id,
    ]);
    return args;
};

export const deleteHabit = async (args: HabitModel) => {
    const db = await openDB();
    await db.run("DELETE FROM habits WHERE habit_id = ?", args.habit_id);
    return args.habit_id;
};
