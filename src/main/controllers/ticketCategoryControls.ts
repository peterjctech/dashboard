import { ipcMain } from "electron";
import { getId } from "../utils";
import { TicketCategoryArgs, TicketCategoryModel } from "../interfaces";
import { createTicketCategory, getTicketCategories, updateTicketCategory, deleteTicketCategory } from "../services";

ipcMain.handle("createTicketCategory", async (_, args: TicketCategoryArgs) => {
    if (!args.category) return { error: "Please fill out the form properly" };

    const props = {
        category_id: getId(),
        category: args.category,
        class: args.class ? args.class : "light",
    };

    try {
        const data = await createTicketCategory(props);
        return { success: `Created ticket category ${props.category}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create ticket category" };
    }
});

ipcMain.handle("getTicketCategories", async () => {
    try {
        const data = await getTicketCategories();
        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get ticket categories" };
    }
});

ipcMain.handle("updateTicketCategory", async (_, args: TicketCategoryModel) => {
    try {
        const data = await updateTicketCategory(args);
        return { info: `Updated category ${args.category}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to update ticket category" };
    }
});

ipcMain.handle("deleteTicketCategory", async (_, args: TicketCategoryModel) => {
    try {
        const data = await deleteTicketCategory(args);
        return { info: `Deleted ticket category ${args.category}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete ticket category" };
    }
});
