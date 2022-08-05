import { ipcMain } from "electron";
import { openDB } from "../utils";
import { createGoalModel, parseGoalData } from "../services";
import { Goal, GoalProps } from "../types";

ipcMain.handle("createGoal", async (_, props: GoalProps) => {
    if (!props.goal || (!props.deadline && props.deadline !== 0))
        return { warning: "You must input a goal and deadline" };
    const model = createGoalModel(props);

    try {
        const db = await openDB();
        await db.run("INSERT INTO goals (goal_id, goal, length, timestamp, date, color) VALUES (?, ?, ?, ?, ?, ?)", [
            model.goal_id,
            model.goal,
            model.length,
            model.timestamp,
            model.date,
            model.color,
        ]);

        const data = parseGoalData([model])[0];
        return { success: `Created goal ${data.goal}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create goal" };
    }
});

ipcMain.handle("getGoals", async () => {
    try {
        const db = await openDB();
        const goals = await db.all("SELECT * FROM goals");
        const data = parseGoalData(goals);
        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get goals" };
    }
});

ipcMain.handle("deleteGoal", async (_, props: Goal) => {
    try {
        const db = await openDB();
        await db.run("DELETE FROM goals WHERE goal_id = ?", props.goal_id);
        return { info: `Deleted goal ${props.goal}`, data: props.goal_id };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete goal" };
    }
});
