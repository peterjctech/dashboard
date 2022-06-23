import { ipcMain } from "electron";
import { getId, openDB, addImage, retrieveImage, removeImage } from "../utils";
import { ShortcutArgs, ShortcutModel } from "../interfaces";
import { createShortcut, getShortcuts, updateShortcut, deleteShortcut } from "../services";

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
        const data = await createShortcut(props);
        return { success: `Created shortcut ${props.title}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create shortcut" };
    }
});

ipcMain.handle("getShortcuts", async (_, args) => {
    try {
        const data = await getShortcuts(args);
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
        const data = await updateShortcut(args);
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
        const data = await deleteShortcut(args);
        return { info: `Deleted shortcut ${args.title}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete shortcut" };
    }
});
