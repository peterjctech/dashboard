import { ipcMain } from "electron";
import { addImage, openDB, removeImage, retrieveImage } from "../utils";
import { createShortcutModel } from "../services";
import { Shortcut, ShortcutProps } from "../types";

ipcMain.handle("createShortcut", async (_, props: ShortcutProps) => {
    if (!props.shortcut || !props.title) return { warning: "You must input a shortcut and title" };
    const model = createShortcutModel(props);

    if (props.icon) await addImage({ path: props.icon, id: model.shortcut_id });

    try {
        const db = await openDB();
        await db.run("INSERT INTO shortcuts (shortcut_id, shortcut, title, type) VALUES (?, ?, ?, ?)", [
            model.shortcut_id,
            model.shortcut,
            model.title,
            model.type,
        ]);

        const data = { ...model, icon: retrieveImage(model.shortcut_id) };

        return { success: `Created shortcut ${model.shortcut}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create shortcut" };
    }
});

ipcMain.handle("getShortcuts", async () => {
    try {
        const db = await openDB();
        const shortcuts = await db.all("SELECT * FROM shortcuts");
        const data = shortcuts.map((obj) => {
            return { ...obj, icon: retrieveImage(obj.shortcut_id) };
        });
        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get shortcuts" };
    }
});

ipcMain.handle("updateShortcut", async (_, props: Shortcut) => {
    try {
        const db = await openDB();
        await db.run("UPDATE shortcuts SET title = ?, shortcut = ? WHERE shortcut_id = ?", [
            props.title,
            props.shortcut,
        ]);
        return { help: `Updated shortcut ${props.title}`, data: props };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get update shortcut" };
    }
});

ipcMain.handle("deleteShortcut", async (_, props: Shortcut) => {
    try {
        const db = await openDB();
        removeImage(props.shortcut_id);
        await db.run("DELETE FROM shortcuts WHERE shortcut_id = ?", props.shortcut_id);
        return { info: `Deleted shortcut ${props.shortcut}`, data: props.shortcut_id };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete shortcut" };
    }
});
