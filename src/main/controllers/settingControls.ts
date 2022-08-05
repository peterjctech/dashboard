import { ipcMain } from "electron";
import { Settings } from "../types";
import { openDB } from "../utils";

ipcMain.handle("getSettings", async () => {
    const data: Settings = {
        database_version: 0,
        app_version: "",
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
