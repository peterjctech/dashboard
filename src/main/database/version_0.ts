import { app } from "electron";
import { CategoryModel, TicketModel } from "../types";
import { openDB, getId, selectRandomItem, colors, getRandomTimestamp, formatDate } from "../utils";
import { faker } from "@faker-js/faker";

export const migration_0 = async () => {
    try {
        const db = await openDB();
        await db.get("PRAGMA foreign_keys = ON");

        const insertSetting = async (key: string, value: any) => {
            await db.run("INSERT INTO settings (key, value) VALUES (?, ?)", [key, value]);
        };

        await insertSetting("app_version", "");
        await insertSetting("ticket_notify_time", 0);

        await db.exec("CREATE TABLE categories (category_id TEXT PRIMARY KEY, category TEXT, color TEXT, for TEXT)");
        await db.exec(
            "CREATE TABLE tickets (ticket_id TEXT PRIMARY KEY, ticket TEXT, is_focused INTEGER, timestamp INTEGER, date TEXT, category_id TEXT REFERENCES categories(category_id))"
        );

        await insertSetting("database_version", 0);
        if (!app.isPackaged) await seed_0();
        console.log("Migrated to database version 0...");
    } catch (error) {
        console.log("Failed migration 0 => ", error);
    }
};

const seed_0 = async () => {
    try {
        const db = await openDB();
        const categorySeeds = getCategorySeeds();
        const ticketSeeds = getTicketSeeds();

        for (let i = 0; i < categorySeeds.length; i++) {
            const model = categorySeeds[i];
            await db.run("INSERT INTO categories (category_id, category, color, for) VALUES (?, ?, ?, ?)", [
                model.category_id,
                model.category,
                model.color,
                model.for,
            ]);
        }
        for (let i = 0; i < ticketSeeds.length; i++) {
            const model = ticketSeeds[i];
            await db.run(
                "INSERT INTO tickets (ticket_id, ticket, is_focused, timestamp, date, category_id) VALUES (?, ?, ?, ?, ?, ?)",
                [model.ticket_id, model.ticket, model.is_focused, model.timestamp, model.date, model.category_id]
            );
        }
        console.log("Seeded database version 0...");
    } catch (error) {
        console.log("Failed to seed database version 0 => ", error);
    }
};

const ticketCategoryIds = [getId(), getId(), getId()];

const getCategorySeeds = () => {
    const categories: CategoryModel[] = [];

    for (let i = 0; i < 3; i++) {
        categories.push({
            category_id: ticketCategoryIds[i],
            category: faker.commerce.product(),
            color: selectRandomItem(colors),
            for: "Tickets",
        });
    }

    return categories;
};

const getTicketSeeds = () => {
    const tickets: TicketModel[] = [];

    for (let i = 0; i < 9; i++) {
        const timestamp = getRandomTimestamp(-4, 14);
        const categoryIndex = Math.floor(i / 3);

        tickets.push({
            ticket_id: getId(),
            ticket: faker.commerce.productDescription(),
            is_focused: selectRandomItem([0, 1]),
            timestamp,
            date: formatDate(timestamp, "shortdate"),
            category_id: ticketCategoryIds[categoryIndex],
        });
    }

    return tickets;
};
