import { openDB } from "../utils";
import { migration_0 } from "./";

export const init = async () => {
    try {
        const db = await openDB();
        await db.exec("CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value BLOB)");
        const obj = await db.get("SELECT value FROM settings WHERE key = 'database_version'");

        let database_version = obj ? obj.value : -1;

        switch (database_version) {
            case -1:
                await migration_0();
                database_version = 0;
        }

        await db.run("UPDATE settings SET value = '0.1.0' WHERE key = 'app_version'");
        console.log("Database is up to date");
    } catch (error) {
        console.log("Init function failed => ", error);
    }
};
