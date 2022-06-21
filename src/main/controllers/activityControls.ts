import { ipcMain } from "electron";
import { getId, openDB } from "../utils";
import { ActivityArgs, ActivityModel } from "../interfaces";

ipcMain.handle("createActivity", async (_, args: ActivityArgs) => {
    if (!args.activity || !args.type) return { error: "Please fill out the form properly" };

    const props = {
        activity_id: getId(),
        activity: args.activity,
        type: args.type,
        class: args.class ? args.class : "light",
    };

    try {
        const db = await openDB();
        await db.run("INSERT INTO activities (activity_id, activity, type, class) VALUES (?, ?, ?, ?)", [
            props.activity_id,
            props.activity,
            props.type,
            props.class,
        ]);

        return { success: `Created activity ${props.activity}`, data: props };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create activity" };
    }
});

ipcMain.handle("getActivities", async () => {
    try {
        const db = await openDB();
        const data = await db.all("SELECT * FROM activities");

        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get activities" };
    }
});

ipcMain.handle("updateActivity", async (_, args: ActivityModel) => {
    try {
        const db = await openDB();
        await db.run("UPDATE activities SET activity = ?, class = ? WHERE activity_id = ?", [
            args.activity,
            args.class,
            args.activity_id,
        ]);
        return { info: `Updated activity ${args.activity}`, data: args };
    } catch (error) {
        console.log(error);
        return { error: "Failed to update activity" };
    }
});

ipcMain.handle("deleteActivity", async (_, args: ActivityModel) => {
    try {
        const db = await openDB();
        const workouts = await db.all("SELECT * FROM workouts WHERE activity_id = ?", args.activity_id);
        if (workouts.length > 0) {
            return { error: "Delete all workouts in category first!" };
        }
        await db.run("DELETE FROM activities WHERE activity_id = ?", args.activity_id);

        return { info: `Deleted activity ${args.activity}`, data: args.activity_id };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete activity" };
    }
});
