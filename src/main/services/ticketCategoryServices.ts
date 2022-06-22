import { openDB } from "../utils";
import { TicketCategoryProps, TicketCategoryModel } from "../interfaces";

export const getTicketCategories = async () => {
    const db = await openDB();
    const data = await db.all("SELECT * FROM ticket_categories");
    return data;
};

export const createTicketCategory = async (props: TicketCategoryProps) => {
    const db = await openDB();
    await db.run("INSERT INTO ticket_categories (category_id, category, class) VALUES (?, ?, ?)", [
        props.category_id,
        props.category,
        props.class,
    ]);
    return props;
};

export const updateTicketCategory = async (args: TicketCategoryModel) => {
    const db = await openDB();
    await db.run("UPDATE ticket_categories SET category = ?, class = ? WHERE category_id = ?", [
        args.category,
        args.class,
        args.category_id,
    ]);
    return args;
};

export const deleteTicketCategory = async (args: TicketCategoryModel) => {
    const db = await openDB();
    const tickets = await db.all("SELECT * FROM tickets WHERE category_id = ?", args.category_id);
    if (tickets.length > 0) {
        return { error: "Delete all tickets in category first!" };
    }
    await db.run("DELETE FROM ticket_categories WHERE category_id = ?", args.category_id);
    return args.category_id;
};
