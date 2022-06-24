import { openDB } from "../utils";
import { ipcMain } from "electron";

ipcMain.handle("getConfig", async (_, args) => {
    try {
        const db = await openDB();
        const data: any = await db.get("SELECT * FROM meta WHERE key = ?", args);
        return { data: data.value };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get config" };
    }
});

ipcMain.handle("getAllConfig", async () => {
    try {
        const db = await openDB();
        const data = await db.all("SELECT * FROM meta");
        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get config" };
    }
});

ipcMain.handle("updateConfig", async (_, args) => {
    try {
        const db = await openDB();
        await db.run("UPDATE meta SET value = ? WHERE key = 'zip_code'", args.zipCode);
        await db.run("UPDATE meta SET value = ? WHERE key = 'latitude'", args.latitude);
        await db.run("UPDATE meta SET value = ? WHERE key = 'longitude'", args.longitude);
        const data = await db.all("SELECT * FROM meta");
        return { success: "Successfully updated config", data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to update config" };
    }
});
