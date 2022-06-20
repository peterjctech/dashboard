import { ipcMain } from "electron";
import { getId, openDB } from "../utils";
import { ActivityArgs } from "../interfaces";

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

    return { info: "Info", data: "Some data" };
});
