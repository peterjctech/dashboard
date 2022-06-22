import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import { ipcMain } from "electron";
import { getId, formatDate, formatShortDate } from "../utils";
import { GoalArgs, GoalModel } from "../interfaces";
import { createGoal, getGoals, deleteGoal } from "../services";
dayjs.extend(quarterOfYear);

ipcMain.handle("createGoal", async (_, args: GoalArgs) => {
    if (!args.goal) return { error: "Please fill out the form properly" };

    let goalDeadline = dayjs();
    switch (args.deadline) {
        case "Weekly":
            goalDeadline = dayjs().day() === 0 ? dayjs().endOf("day") : dayjs().endOf("week").add(1, "day");
            break;
        case "Monthly":
            goalDeadline = dayjs().endOf("month");
            break;
        case "Quarterly":
            goalDeadline = dayjs().endOf("quarter");
            break;
        case "Yearly":
            goalDeadline = dayjs().endOf("year");
            break;
        default:
            goalDeadline = dayjs().endOf("day").add(args.deadline, "day");
            break;
    }

    const props = {
        goal_id: getId(),
        goal: args.goal,
        date: formatDate(goalDeadline),
        timestamp: dayjs(goalDeadline).unix(),
        created_timestamp: dayjs().unix(),
        created_at: formatShortDate(dayjs()),
    };

    try {
        const data = await createGoal(props);
        return { success: `Created goal ${props.goal}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create goal" };
    }
});

ipcMain.handle("getGoals", async () => {
    try {
        const data = await getGoals();
        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get goals" };
    }
});

ipcMain.handle("deleteGoal", async (_, args: GoalModel) => {
    try {
        const data = await deleteGoal(args);
        return { info: `Deleted goal ${args.goal}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete goal" };
    }
});
