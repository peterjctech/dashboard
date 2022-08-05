import { openDB } from "../utils";
import { migration_1, migration_2, migration_3 } from "./";

export const init = async () => {
    try {
        const db = await openDB();
        await db.exec("CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value BLOB)");
        const obj = await db.get("SELECT value FROM settings WHERE key = 'database_version'");

        let database_version = obj ? obj.value : 0;

        switch (database_version) {
            case 0:
                await migration_1();
                database_version = 1;
            case 1:
                await migration_2();
                database_version = 2;
            case 2:
                await migration_3();
                database_version = 3;
        }

        await db.run("UPDATE settings SET value = '3.0.0' WHERE key = 'app_version'");
        console.log("Database is up to date");
    } catch (error) {
        console.log("Init function failed => ", error);
    }
};
