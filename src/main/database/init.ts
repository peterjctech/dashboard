import { openDB } from "../utils";
import { migration_1 } from "./";

export const init = async () => {
    try {
        const db = await openDB();
        await db.exec("CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value BLOB)");
        let version = await db.get("SELECT value FROM meta WHERE key = 'database_version'");

        let database_version = version ? version.value : 0;

        switch (database_version) {
            case 0:
                await migration_1();
                database_version = 1;
        }
    } catch (error) {
        console.log(error);
    }
};
