import { openDB, imagesDir } from "../utils";
import { migration_1 } from "./";
import { mkdir } from "fs";

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

        mkdir(imagesDir(), { recursive: true }, (e) => {
            if (e) console.log("Failed to create image directory => ", e);
        });

        console.log("Database is up to date");
    } catch (error) {
        console.log(error);
    }
};
