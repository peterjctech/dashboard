import { openDB, imagesDir } from "../utils";
import { mkdir } from "fs";

export const migration_3 = async () => {
    try {
        const db = await openDB();

        await db.run("INSERT INTO settings (key, value) VALUES ('habit_notify_time', 0)");

        await db.exec("CREATE TABLE shopping_list (item_id TEXT PRIMARY KEY, item TEXT, color TEXT)");
        await db.exec(
            "CREATE TABLE reminders (reminder_id TEXT PRIMARY KEY, reminder TEXT, timestamp INTEGER, time TEXT)"
        );
        await db.exec("CREATE TABLE shortcuts (shortcut_id TEXT PRIMARY KEY, shortcut TEXT, title TEXT, type TEXT)");
        await db.exec(
            "CREATE TABLE notes (note_id TEXT PRIMARY KEY, title TEXT, note TEXT, color INTEGER, updated_at TEXT, timestamp INTEGER)"
        );
        await db.exec(
            "CREATE TABLE habits (habit_id TEXT PRIMARY KEY, habit TEXT, frequency INTEGER, last_completed INTEGER, last_broken INTEGER, created_timestamp INTEGER)"
        );

        mkdir(imagesDir(), { recursive: true }, (error) => {
            if (error) console.log("Failed to create image directory => ", error);
        });

        await db.run("UPDATE settings SET value = 3 WHERE key = 'database_version'");
        console.log("Migrated to database version 3...");
    } catch (error) {
        console.log("Failed migration 3 => ", error);
    }
};
