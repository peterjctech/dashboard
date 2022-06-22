import { ActivityModel, ActivityProps } from "../../interfaces";
import { openDB } from "../utils";

export const getActivities = async () => {
    const db = await openDB();
    const data = await db.all("SELECT * FROM activities");
    return data;
};

export const createActivity = async (props: ActivityProps) => {
    const db = await openDB();
    await db.run("INSERT INTO activities (activity_id, activity, type, class) VALUES (?, ?, ?, ?)", [
        props.activity_id,
        props.activity,
        props.type,
        props.class,
    ]);
    return props;
};

export const updateActivity = async (args: ActivityModel) => {
    const db = await openDB();
    await db.run("UPDATE activities SET activity = ?, class = ? WHERE activity_id = ?", [
        args.activity,
        args.class,
        args.activity_id,
    ]);
    return args;
};

export const deleteActivity = async (args: ActivityModel) => {
    const db = await openDB();
    const workouts = await db.all("SELECT * FROM workouts WHERE activity_id = ?", args.activity_id);
    if (workouts.length > 0) {
        return { error: "Delete all workouts in category first!" };
    }
    await db.run("DELETE FROM activities WHERE activity_id = ?", args.activity_id);
    return args.activity_id;
};
