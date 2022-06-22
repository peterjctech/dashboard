import { ipcMain } from "electron";
import { getId } from "../utils";
import { ActivityArgs, ActivityModel } from "../interfaces";
import { getActivities, createActivity, updateActivity, deleteActivity } from "../services";

ipcMain.handle("createActivity", async (_, args: ActivityArgs) => {
    if (!args.activity || !args.type) return { error: "Please fill out the form properly" };

    const props = {
        activity_id: getId(),
        activity: args.activity,
        type: args.type,
        class: args.class ? args.class : "light",
    };

    try {
        const data = await createActivity(props);
        return { success: `Created activity ${args.activity}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create activity" };
    }
});

ipcMain.handle("getActivities", async () => {
    try {
        const data = await getActivities();
        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get activities" };
    }
});

ipcMain.handle("updateActivity", async (_, args: ActivityModel) => {
    try {
        const data = await updateActivity(args);
        return { info: `Updated activity ${args.activity}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to update activity" };
    }
});

ipcMain.handle("deleteActivity", async (_, args: ActivityModel) => {
    try {
        const data = await deleteActivity(args);
        return { info: `Deleted activity ${args.activity}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete activity" };
    }
});
