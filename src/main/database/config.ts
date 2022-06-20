import sqlite3 from "sqlite3";
import { app } from "electron";
import path from "path";

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
