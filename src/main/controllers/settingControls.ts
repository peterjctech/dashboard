import { ipcMain } from "electron";
import { Settings } from "../types";
import { openDB } from "../utils";

ipcMain.handle("getSettings", async () => {
    const data: Settings = {
        database_version: 0,
        app_version: "",
        ticket_notify_time: 0,
    };

    try {
        const db = await openDB();
        const settings = await db.all("SELECT * FROM settings");

        for (let i = 0; i < settings.length; i++) {
            data[settings[i].key] = settings[i].value;
        }

        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get settings" };
    }
});

ipcMain.handle("updateSettings", async (_, props: Settings) => {
    try {
        const db = await openDB();

        console.log(props);

        const update = async (key: string, value: any) => {
            await db.run("UPDATE settings SET value = ? WHERE key = ?", [value, key]);
        };

        await update("ticket_notify_time", props.ticket_notify_time);

        return { help: "Updated settings", data: props };
    } catch (error) {
        console.log(error);
        return { error: "Failed to update settings" };
    }
});
