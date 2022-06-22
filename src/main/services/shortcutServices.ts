import { openDB } from "../utils";
import { retrieveImage } from "../utils";
import { ShortcutProps, ShortcutModel } from "../../interfaces";

export const getShortcuts = async () => {
    const db = await openDB();
    const shortcuts = await db.all("SELECT * FROM shortcuts");

    const data = shortcuts.map((obj) => {
        const icon = retrieveImage(obj.shortcut_id);
        return { ...obj, icon };
    });
    return data;
};

export const createShortcut = async (props: ShortcutProps) => {
    const db = await openDB();
    await db.run("INSERT INTO shortcuts (shortcut_id, title, shortcut, type) VALUES (?, ?, ?, ?)", [
        props.shortcut_id,
        props.title,
        props.shortcut,
        props.type,
    ]);

    const icon = retrieveImage(props.shortcut_id);
    const data = { ...props, icon: icon || null };
    return data;
};

export const updateShortcut = async (args: ShortcutModel) => {
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
    return data;
};

export const deleteShortcut = async (args: ShortcutModel) => {
    const db = await openDB();
    await db.run("DELETE FROM shortcuts WHERE shortcut_id = ?", args.shortcut_id);
    return args.shortcut_id;
};
