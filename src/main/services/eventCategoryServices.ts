import { openDB } from "../utils";
import { EventCategoryProps, EventCategoryModel } from "../interfaces";

export const getEventCategories = async () => {
    const db = await openDB();
    const data = await db.all("SELECT * FROM event_categories");
    return data;
};

export const createEventCategory = async (props: EventCategoryProps) => {
    const db = await openDB();
    await db.run("INSERT INTO event_categories (category_id, category, class) VALUES (?, ?, ?)", [
        props.category_id,
        props.category,
        props.class,
    ]);
    return props;
};

export const updateEventCategory = async (args: EventCategoryModel) => {
    const db = await openDB();
    await db.run("UPDATE event_categories SET category = ?, class = ? WHERE category_id = ?", [
        args.category,
        args.class,
        args.category_id,
    ]);
    return args;
};

export const deleteEventCategory = async (args: EventCategoryModel) => {
    const db = await openDB();
    const events = await db.all("SELECT * FROM events WHERE category_id = ?", args.category_id);
    if (events.length > 0) {
        return { error: "Delete all events in category first!" };
    }
    await db.run("DELETE FROM event_categories WHERE category_id = ?", args.category_id);
    return args.category_id;
};
