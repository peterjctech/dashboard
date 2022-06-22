import dayjs from "dayjs";
import { openDB } from "../utils";
import { GoalProps, GoalModel } from "../interfaces";

export const getGoals = async () => {
    const db = await openDB();
    const goals = await db.all("SELECT * FROM goals");

    const currentTime = dayjs().unix();
    const endOfDay = dayjs().endOf("day").unix();
    const inOneWeek = dayjs().add(7, "day").unix();

    const data = goals.map((obj) => {
        let status: string | null = null;
        let goalClass = "pink";
        if (currentTime > obj.timestamp) {
            status = "Passed";
            goalClass = "red";
        } else if (endOfDay >= obj.timestamp) {
            status = "Today";
            goalClass = "orange";
        } else if (inOneWeek > obj.timestamp) {
            status = "Upcoming";
            goalClass = "green";
        }
        return { ...obj, status, class: goalClass };
    });

    data.sort((a, b) => a.timestamp - b.timestamp);
    return data;
};

export const createGoal = async (props: GoalProps) => {
    const db = await openDB();
    await db.run(
        "INSERT INTO goals (goal_id, goal, date, timestamp, created_timestamp, created_at) VALUES (?, ?, ?, ?, ?, ?)",
        [props.goal_id, props.goal, props.date, props.timestamp, props.created_timestamp, props.created_at]
    );
    const data = await getGoals();
    return data;
};

export const deleteGoal = async (args: GoalModel) => {
    const db = await openDB();
    await db.run("DELETE FROM goals WHERE goal_id = ?", args.goal_id);
    return args.goal_id;
};
