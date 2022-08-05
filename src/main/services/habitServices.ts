import { HabitProps, HabitModel, Habit } from "../types";
import { getId, formatDate } from "../utils";
import dayjs from "dayjs";

export const parseHabitData = (habits: HabitModel[]) => {
    const data: Habit[] = [];

    for (let i = 0; i < habits.length; i++) {
        const dueDate = formatDate(habits[i].next_due, "date");
        const secondStreak = dayjs().unix() - habits[i].last_broken;
        const streak = Math.floor(secondStreak / 86400);
        let color;

        if (streak < 7) {
            color = "red";
        } else if (streak < 14) {
            color = "orange";
        } else if (streak < 21) {
            color = "yellow";
        } else if (streak < 50) {
            color = "green";
        } else if (streak < 100) {
            color = "cyan";
        } else if (streak < 200) {
            color = "blue";
        } else if (streak < 365) {
            color = "magenta";
        } else {
            color = "pink";
        }

        data.push({ ...habits[i], color, due_date: dueDate, streak: `${streak} ${streak === 1 ? "day" : "days"}` });
    }

    return data;
};

export const createHabitModel = (props: HabitProps) => {
    const now = dayjs().unix();

    const model: HabitModel = {
        habit_id: getId(),
        habit: props.habit,
        frequency: props.frequency,
        last_completed: now,
        last_broken: now,
        next_due: dayjs().endOf("day").add(props.frequency, "day").unix(),
    };

    return model;
};
