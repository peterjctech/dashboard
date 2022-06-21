import { ipcMain } from "electron";
import { getId, openDB } from "../utils";
import { TicketCategoryArgs, TicketCategoryModel } from "../interfaces";

ipcMain.handle("createTicketCategory", async (_, args: TicketCategoryArgs) => {
    if (!args.category) return { error: "Please fill out the form properly" };

    const props = {
        category_id: getId(),
        category: args.category,
        class: args.class ? args.class : "light",
    };

    try {
        const db = await openDB();
        await db.run("INSERT INTO ticket_categories (category_id, category, class) VALUES (?, ?, ?)", [
            props.category_id,
            props.category,
            props.class,
        ]);

        return { success: `Created ticket category ${props.category}`, data: props };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create ticket category" };
    }
});

ipcMain.handle("getTicketCategories", async () => {
    try {
        const db = await openDB();
        const data = await db.all("SELECT * FROM ticket_categories");

        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get ticket categories" };
    }
});

ipcMain.handle("updateTicketCategory", async (_, args: TicketCategoryModel) => {
    try {
        const db = await openDB();
        await db.run("UPDATE ticket_categories SET category = ?, class = ? WHERE category_id = ?", [
            args.category,
            args.class,
            args.category_id,
        ]);
        return { info: `Updated category ${args.category}`, data: args };
    } catch (error) {
        console.log(error);
        return { error: "Failed to update ticket category" };
    }
});

ipcMain.handle("deleteTicketCategory", async (_, args: TicketCategoryModel) => {
    try {
        const db = await openDB();
        const tickets = await db.all("SELECT * FROM tickets WHERE category_id = ?", args.category_id);
        if (tickets.length > 0) {
            return { error: "Delete all tickets in category first!" };
        }
        await db.run("DELETE FROM ticket_categories WHERE category_id = ?", args.category_id);

        return { info: `Deleted ticket category ${args.category}`, data: args.category_id };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete ticket category" };
    }
});
