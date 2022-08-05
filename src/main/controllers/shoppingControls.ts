import { ipcMain } from "electron";
import { openDB } from "../utils";
import { createShoppingModel } from "../services";
import { Shopping, ShoppingProps } from "../types";

ipcMain.handle("createShoppingItem", async (_, props: ShoppingProps) => {
    if (!props.item) return { warning: "You must input an item" };
    const model = createShoppingModel(props);

    try {
        const db = await openDB();
        await db.run("INSERT INTO shopping_list (item_id, item, color) VALUES (?, ?, ?)", [
            model.item_id,
            model.item,
            model.color,
        ]);

        return { success: `Created item ${model.item}`, data: model };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create item" };
    }
});

ipcMain.handle("getShoppingList", async () => {
    try {
        const db = await openDB();
        const data = await db.all("SELECT * FROM shopping_list");
        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get shopping list" };
    }
});

ipcMain.handle("deleteShoppingItem", async (_, props: Shopping) => {
    try {
        const db = await openDB();
        await db.run("DELETE FROM shopping_list WHERE item_id = ?", props.item_id);
        return { info: `Deleted item ${props.item}`, data: props.item_id };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete item" };
    }
});
