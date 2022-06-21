import { openDB } from "../../utils";

export const migration_1 = async () => {
    try {
        const db = await openDB();
        await db.get("PRAGMA foreign_keys = ON");
        await db.run("INSERT INTO meta (key, value) VALUES ('database_version', 0)");

        await db.exec("CREATE TABLE ticket_categories (category_id TEXT PRIMARY KEY, category TEXT, class TEXT)");
        await db.exec("CREATE TABLE event_categories (category_id TEXT PRIMARY KEY, category TEXT, class TEXT)");
        // type will be for graphing purposes (visualizing progress)
        await db.exec("CREATE TABLE activities (activity_id TEXT PRIMARY KEY, activity TEXT, type TEXT, class TEXT)");

        await db.exec(
            "CREATE TABLE tickets (ticket_id TEXT PRIMARY KEY, ticket TEXT, is_focused INTEGER, timestamp INTEGER, date TEXT, category_id TEXT REFERENCES ticket_categories(category_id))"
        );
        await db.exec(
            "CREATE TABLE events (event_id TEXT PRIMARY KEY, event TEXT, timestamp INTEGER, date TEXT, category_id TEXT REFERENCES event_categories(category_id))"
        );
        await db.exec(
            "CREATE TABLE workouts (workout_id TEXT PRIMARY KEY, workout TEXT, timestamp INTEGER, date TEXT, activity_id TEXT REFERENCES activities(activity_id))"
        );

        await db.exec(
            "CREATE TABLE goals (goal_id TEXT PRIMARY KEY, goal TEXT, date TEXT, timestamp INTEGER, created_timestamp INTEGER, created_at TEXT)"
        );
        await db.exec("CREATE TABLE shortcuts (shortcut_id TEXT PRIMARY KEY, shortcut TEXT, title TEXT, type TEXT)");
        await db.exec(
            "CREATE TABLE reminders (reminder_id TEXT PRIMARY KEY, reminder TEXT, timestamp INTEGER, time TEXT)"
        );
        await db.exec(
            "CREATE TABLE achievements (achievement_id TEXT PRIMARY KEY, achievement TEXT, timestamp INTEGER, date TEXT, class TEXT)"
        );
        // timestamp is the most recent out of last created or last updated, for sorting purposes
        await db.exec(
            "CREATE TABLE notes (note_id TEXT PRIMARY KEY, title TEXT, note TEXT, updated_at TEXT, timestamp INTEGER)"
        );
        // e.g. => margin is in days, when retrieving habits, if last_completed is more than x days before now, reset last broken to last_completed + x days. when completing, check previously mentioned condition, and if it's within margin update last_completed
        await db.exec(
            "CREATE TABLE habits (habit_id TEXT PRIMARY KEY, habit TEXT, margin INTEGER, last_completed INTEGER, last_broken INTEGER, created_at TEXT, timestamp INTEGER, class TEXT)"
        );
        await db.exec("CREATE TABLE quotes (quote_id TEXT PRIMARY KEY, quote TEXT)");

        await db.run("UPDATE meta SET value = 1 WHERE key = 'database_version'");
        console.log("Successfully migrated to database version 1.0.0");
    } catch (error) {
        console.log("Failed to migrate to database version 1.0.0 => ", error);
    }
};
