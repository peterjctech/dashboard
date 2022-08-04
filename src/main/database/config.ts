import { app } from "electron";
import path from "path";
import sqlite3 from "sqlite3";

let dbPath;

if (app.isPackaged) {
    dbPath = path.join(app.getPath("userData"), "dashboard.sqlite");
} else {
    dbPath = "test-db.sqlite";
}

export const db = {
    filename: dbPath,
    driver: sqlite3.cached.Database,
};
