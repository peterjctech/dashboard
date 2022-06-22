import { ipcMain } from "electron";
import { getId } from "../utils";
import { EventCategoryArgs, EventCategoryModel } from "../../interfaces";
import { createEventCategory, getEventCategories, updateEventCategory, deleteEventCategory } from "../services";

ipcMain.handle("createEventCategory", async (_, args: EventCategoryArgs) => {
    if (!args.category) return { error: "Please fill out the form properly" };

    const props = {
        category_id: getId(),
        category: args.category,
        class: args.class ? args.class : "light",
    };

    try {
        const data = await createEventCategory(props);
        return { success: `Created event category ${args.category}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create event category" };
    }
});

ipcMain.handle("getEventCategories", async () => {
    try {
        const data = await getEventCategories();
        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get event categories" };
    }
});

ipcMain.handle("updateEventCategory", async (_, args: EventCategoryModel) => {
    try {
        const data = await updateEventCategory(args);
        return { info: `Updated category ${args.category}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to update event category" };
    }
});

ipcMain.handle("deleteEventCategory", async (_, args: EventCategoryModel) => {
    try {
        const data = await deleteEventCategory(args);
        return { info: `Deleted event category ${args.category}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete event category" };
    }
});
