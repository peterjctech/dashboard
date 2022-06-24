import { openDB, formatDate } from "../utils";
import { HabitProps, HabitModel } from "../interfaces";
import dayjs from "dayjs";

export const getHabits = async () => {
    const db = await openDB();
    const now = dayjs().unix();
    const habits = await db.all("SELECT * FROM habits");
    const needsUpdate: HabitProps[] = [];
    const data: HabitModel[] = [];
    habits.forEach((habit) => {
        const lastCompleted = habit.last_completed;
        const lastCompletedInDateForm = dayjs.unix(lastCompleted);
        const deadline = lastCompletedInDateForm.endOf("day").add(habit.margin, "day").unix();
        if (now > deadline) {
            const newObj = {
                ...habit,
                last_broken: deadline,
                next_deadline: dayjs().unix(),
                streak: "0 days",
                next_deadline_string: "ASAP",
            };
            needsUpdate.push(newObj);
            data.push(newObj);
        } else {
            const diff = now - habit.last_broken;
            const nextDeadline = dayjs.unix(habit.last_completed).endOf("day").add(habit.margin, "day");
            data.push({
                ...habit,
                streak: `${Math.round(diff / 86400)} days`,
                next_deadline_string: formatDate(nextDeadline),
                next_deadline: nextDeadline.unix(),
            });
        }
    });

    needsUpdate.forEach(async (obj) => {
        await db.run("UPDATE habits SET last_broken = ? WHERE habit_id = ?", [obj.last_broken, obj.habit_id]);
    });

    data.sort((a, b) => a.next_deadline - b.next_deadline);

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

export const checkInHabit = async (args: HabitModel) => {
    const db = await openDB();
    await db.get("UPDATE habits SET last_completed = ? WHERE habit_id = ?", [dayjs().unix(), args.habit_id]);
    const data = await getHabits();
    return data;
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
