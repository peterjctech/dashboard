import { ipcMain } from "electron";
import { getId, openDB } from "../utils";
import { EventCategoryArgs, EventCategoryModel } from "../interfaces";

ipcMain.handle("createEventCategory", async (_, args: EventCategoryArgs) => {
    if (!args.category) return { error: "Please fill out the form properly" };

    const props = {
        category_id: getId(),
        category: args.category,
        class: args.class ? args.class : "light",
    };

    try {
        const db = await openDB();
        await db.run("INSERT INTO event_categories (category_id, category, class) VALUES (?, ?, ?)", [
            props.category_id,
            props.category,
            props.class,
        ]);

        return { success: `Created event category ${props.category}`, data: props };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create event category" };
    }
});

ipcMain.handle("getEventCategories", async () => {
    try {
        const db = await openDB();
        const data = await db.all("SELECT * FROM event_categories");

        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get event categories" };
    }
});

ipcMain.handle("updateEventCategory", async (_, args: EventCategoryModel) => {
    try {
        const db = await openDB();
        await db.run("UPDATE event_categories SET category = ?, class = ? WHERE category_id = ?", [
            args.category,
            args.class,
            args.category_id,
        ]);
        return { info: `Updated category ${args.category}`, data: args };
    } catch (error) {
        console.log(error);
        return { error: "Failed to update event category" };
    }
});

ipcMain.handle("deleteEventCategory", async (_, args: EventCategoryModel) => {
    try {
        const db = await openDB();
        const events = await db.all("SELECT * FROM events WHERE category_id = ?", args.category_id);
        if (events.length > 0) {
            return { error: "Delete all events in category first!" };
        }
        await db.run("DELETE FROM event_categories WHERE category_id = ?", args.category_id);

        return { info: `Deleted event category ${args.category}`, data: args.category_id };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete event category" };
    }
});
