import { ipcMain } from "electron";
import { getId, openDB, addImage, retrieveImage, removeImage } from "../utils";
import { ShortcutArgs, ShortcutModel } from "../interfaces";

// shortcut: string;
// title: string;
// type: "Link" | "Application" | "Search";
// icon?: string;

ipcMain.handle("createShortcut", async (_, args: ShortcutArgs) => {
    if (!args.shortcut || !args.title || !args.type) return { error: "Please fill out the form properly" };

    const shortcutId = getId();

    if (args.icon) {
        addImage({ path: args.icon, id: shortcutId });
    }

    const props = {
        shortcut_id: shortcutId,
        title: args.title,
        shortcut: args.shortcut,
        type: args.type,
    };

    try {
        const db = await openDB();
        await db.run("INSERT INTO shortcuts (shortcut_id, title, shortcut, type) VALUES (?, ?, ?, ?)", [
            props.shortcut_id,
            props.title,
            props.shortcut,
            props.type,
        ]);

        const icon = retrieveImage(props.shortcut_id);

        return { success: `Created shortcut ${props.title}`, data: { ...props, icon: icon || null } };
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
            const icon = retrieveImage(obj.shortcut_id);
            return { ...obj, icon };
        });

        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get shortcuts" };
    }
});

ipcMain.handle("updateShortcut", async (_, args: ShortcutModel) => {
    if (args.icon) {
        const success = await removeImage(args.shortcut_id);
        if (success) {
            addImage({ id: args.shortcut_id, path: args.icon });
        } else {
            return { error: "Failed to remove icon" };
        }
    }
    try {
        const db = await openDB();
        await db.run("UPDATE shortcuts SET title = ?, shortcut = ? WHERE shortcut_id = ?", [
            args.title,
            args.shortcut,
            args.shortcut_id,
        ]);

        const icon = retrieveImage(args.shortcut_id);
        const data = {
            shortcut_id: args.shortcut_id,
            shortcut: args.shortcut,
            title: args.title,
            type: args.type,
            icon,
        };

        return { info: `Updated shortcut ${args.title}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to update shortcut" };
    }
});

ipcMain.handle("deleteShortcut", async (_, args: ShortcutModel) => {
    const success = removeImage(args.shortcut_id);
    if (!success) return { error: "Failed to remove icon" };

    try {
        const db = await openDB();
        await db.run("DELETE FROM shortcuts WHERE shortcut_id = ?", args.shortcut_id);

        return { info: `Deleted shortcut ${args.title}`, data: args.shortcut_id };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete shortcut" };
    }
});
