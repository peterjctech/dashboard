import { ipcMain } from "electron";
import { openDB } from "../utils";
import { createCategoryModel } from "../services";
import { CategoryProps, Category } from "../types";

interface GetCategoryProps {
    for: string;
}

ipcMain.handle("createCategory", async (_, props: CategoryProps) => {
    if (!props.category || !props.color) return { warning: "You must input a color and category" };
    const model = createCategoryModel(props);

    try {
        const db = await openDB();
        await db.run("INSERT INTO categories (category_id, category, color, for) VALUES (?, ?, ?, ?)", [
            model.category_id,
            model.category,
            model.color,
            model.for,
        ]);
        return { success: `Created category ${model.category} for ${model.for}`, data: model };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create category" };
    }
});

ipcMain.handle("getCategories", async (_, props: GetCategoryProps) => {
    try {
        const db = await openDB();
        const data = await db.all("SELECT * FROM categories WHERE for = ?", props.for);
        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get categories" };
    }
});

ipcMain.handle("updateCategory", async (_, props: Category) => {
    try {
        const db = await openDB();
        await db.run("UPDATE categories SET category = ?, color = ? WHERE category_id = ?", [
            props.category,
            props.color,
            props.category_id,
        ]);
        return { help: `Updated category ${props.category}`, data: props };
    } catch (error) {
        console.log(error);
        return { error: "Failed to update category" };
    }
});

ipcMain.handle("deleteCategory", async (_, props: Category) => {
    try {
        const db = await openDB();
        let children: null | any[] = null;
        if (props.for === "Tickets") {
            children = await db.all("SELECT * FROM tickets WHERE category_id = ?", props.category_id);
        } else if (props.for === "Achievements") {
            children = await db.all("SELECT * FROM achievements WHERE type_id = ?", props.category_id);
        }
        if (children === null) return { error: "Unexpected error in delete category handler" };
        if (children.length > 0) return { warning: "Delete all tickets from category first!" };
        await db.run("DELETE FROM categories WHERE category_id = ?", props.category_id);
        return { info: `Deleted category ${props.category} for ${props.for}`, data: props.category_id };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete category" };
    }
});
