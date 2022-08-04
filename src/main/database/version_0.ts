import { openDB } from "../utils";

export const migration_0 = async () => {
    try {
        const db = await openDB();
        await db.get("PRAGMA foreign_keys = ON");

        const insertSetting = async (key: string, value: any) => {
            await db.run("INSERT INTO settings (key, value) VALUES (?, ?)", [key, value]);
        };

        await insertSetting("app_version", "");

        await db.exec("CREATE TABLE categories (category_id TEXT PRIMARY KEY, category TEXT, color TEXT, for TEXT)");
        await db.exec(
            "CREATE TABLE tickets (ticket_id TEXT PRIMARY KEY, ticket TEXT, is_focused INTEGER, timestamp INTEGER, date TEXT, category_id TEXT REFERENCES categories(category_id))"
        );

        await insertSetting("database_version", 0);
        console.log("Migrated to database version 0...");
    } catch (error) {
        console.log("Failed migration 0 => ", error);
    }
};
