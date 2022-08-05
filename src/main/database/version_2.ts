import { app } from "electron";
import { CategoryModel, AchievementModel, EventProps, GoalProps, QuoteProps } from "../types";
import { openDB, getId, selectRandomItem, colors, getRandomTimestamp, formatDate } from "../utils";
import { createEventModel, createGoalModel, createQuoteModel } from "../services";
import dayjs from "dayjs";

export const migration_2 = async () => {
    try {
        const db = await openDB();
        await db.get("PRAGMA foreign_keys = ON");

        const insertSetting = async (key: string, value: any) => {
            await db.run("INSERT INTO settings (key, value) VALUES (?, ?)", [key, value]);
        };

        await insertSetting("event_notify_time", 0);
        await insertSetting("goal_notify_time", 0);
        await insertSetting("zip_code", 0);
        await insertSetting("latitude", 0);
        await insertSetting("longitude", 0);

        await db.exec(
            "CREATE TABLE goals (goal_id TEXT PRIMARY KEY, goal TEXT, length TEXT, timestamp INTEGER, date TEXT, color TEXT)"
        );
        await db.exec("CREATE TABLE quotes (quote_id TEXT PRIMARY KEY, quote TEXT)");
        await db.exec(
            "CREATE TABLE events (event_id TEXT PRIMARY KEY, event TEXT, description TEXT, timestamp INTEGER, date TEXT, time TEXT)"
        );
        await db.exec(
            "CREATE TABLE achievements (achievement_id TEXT PRIMARY KEY, achievement TEXT, timestamp INTEGER, date TEXT, category_id TEXT REFERENCES categories(category_id))"
        );

        await db.run("UPDATE settings SET value = 2 WHERE key = 'database_version'");
        if (!app.isPackaged) await seed_2();
        console.log("Migrated to database version 2...");
    } catch (error) {
        console.log("Failed migration 2 => ", error);
    }
};

const seed_2 = async () => {
    try {
        const db = await openDB();
        const achievementSeeds = getAchievementSeeds();
        const categorySeeds = getCategorySeeds();

        for (let i = 0; i < categorySeeds.length; i++) {
            const model = categorySeeds[i];
            await db.run("INSERT INTO categories (category_id, category, color, for) VALUES (?, ?, ?, ?)", [
                model.category_id,
                model.category,
                model.color,
                model.for,
            ]);
        }
        for (let i = 0; i < achievementSeeds.length; i++) {
            const model = achievementSeeds[i];
            await db.run(
                "INSERT INTO achievements (achievement_id, achievement, timestamp, date, category_id) VALUES (?, ?, ?, ?, ?)",
                [model.achievement_id, model.achievement, model.timestamp, model.date, model.category_id]
            );
        }
        for (let i = 0; i < goalSeeds.length; i++) {
            const model = createGoalModel(goalSeeds[i]);
            await db.run(
                "INSERT INTO goals (goal_id, goal, length, timestamp, date, color) VALUES (?, ?, ?, ?, ?, ?)",
                [model.goal_id, model.goal, model.length, model.timestamp, model.date, model.color]
            );
        }
        for (let i = 0; i < eventSeeds.length; i++) {
            const model = createEventModel(eventSeeds[i]);
            await db.run(
                "INSERT INTO events (event_id, event, description, timestamp, date, time) VALUES (?, ?, ?, ?, ?, ?)",
                [model.event_id, model.event, model.description, model.timestamp, model.date, model.time]
            );
        }
        for (let i = 0; i < quoteSeeds.length; i++) {
            const model = createQuoteModel(quoteSeeds[i]);
            await db.run("INSERT INTO quotes (quote_id, quote) VALUES (?, ?)", [model.quote_id, model.quote]);
        }
        console.log("Seeded database version 2...");
    } catch (error) {
        console.log("Failed to seed database version 2 => ", error);
    }
};

const achievementCategoryIds = [getId(), getId(), getId()];

const getCategorySeeds = () => {
    const categories: CategoryModel[] = [];
    const categoryNames = ["Mile time", "Pushups", "Bench Press"];

    for (let i = 0; i < 3; i++) {
        categories.push({
            category_id: achievementCategoryIds[i],
            category: categoryNames[i],
            color: selectRandomItem(colors),
            for: "Achievements",
        });
    }

    return categories;
};

const getAchievementSeeds = () => {
    const achievements: AchievementModel[] = [];

    const mileAchievements = [
        { achievement: "15:00", daysAgo: 90 },
        { achievement: "9:30", daysAgo: 47 },
        { achievement: "7:30", daysAgo: 29 },
    ];
    const pushupAchievements = [
        { achievement: "5", daysAgo: 30 },
        { achievement: "13", daysAgo: 9 },
        { achievement: "22", daysAgo: 4 },
    ];
    const benchPressAchievements = [
        { achievement: "30 lbs", daysAgo: 102 },
        { achievement: "50 lbs", daysAgo: 60 },
        { achievement: "80 lbs", daysAgo: 12 },
    ];

    const getTimestamp = (num: number) => dayjs().subtract(num, "day").unix();

    for (let i = 0; i < 3; i++) {
        const mileTimestamp = getTimestamp(mileAchievements[i].daysAgo);
        const pushupTimestamp = getTimestamp(pushupAchievements[i].daysAgo);
        const benchPressTimestamp = getTimestamp(benchPressAchievements[i].daysAgo);

        achievements.push({
            achievement_id: getId(),
            achievement: mileAchievements[i].achievement,
            timestamp: mileTimestamp,
            date: formatDate(mileTimestamp, "shortdate"),
            category_id: achievementCategoryIds[0],
        });
        achievements.push({
            achievement_id: getId(),
            achievement: pushupAchievements[i].achievement,
            timestamp: pushupTimestamp,
            date: formatDate(pushupTimestamp, "shortdate"),
            category_id: achievementCategoryIds[1],
        });
        achievements.push({
            achievement_id: getId(),
            achievement: benchPressAchievements[i].achievement,
            timestamp: benchPressTimestamp,
            date: formatDate(benchPressTimestamp, "shortdate"),
            category_id: achievementCategoryIds[2],
        });
    }

    return achievements;
};

const eventSeeds: EventProps[] = [
    {
        event: "Job interview",
        description: "Get there early",
        timestamp: getRandomTimestamp(-7, 21),
    },
    {
        event: "Hang out",
        description: "Bring food",
        timestamp: getRandomTimestamp(-7, 21),
    },
    {
        event: "Piano practice",
        description: "Don't slack off",
        timestamp: getRandomTimestamp(-7, 21),
    },
    {
        event: "Go Shopping",
        description: "Don't forget",
        timestamp: getRandomTimestamp(-7, 21),
    },
];

const goalSeeds: GoalProps[] = [
    { goal: "Get a promotion", deadline: "Yearly" },
    { goal: "Finish this app", deadline: "Monthly" },
];

const quoteSeeds: QuoteProps[] = [
    { quote: "You must be the change you wish to see in the world", author: "Mahatma Gandhi" },
    { quote: "In a gentle way, you can shake the world", author: "Mahatma Gandhi" },
    {
        quote: "All men dream, but not equally; those who dream by night in the dusty recesses of their minds wake in the day to find that it was vanity. But the dreamers of the day are dangerous men, for they may act their dreams with open eyes to make it possible.",
        author: "T.E. Lawrence",
    },
    { quote: "When your only tool is a hammer, you tend to look at every problem as a nail", author: "Abraham Maslov" },
];
