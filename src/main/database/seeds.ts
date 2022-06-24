import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import {
    createActivity,
    createGoal,
    createNote,
    createEvent,
    createHabit,
    createQuote,
    createTicket,
    createWorkout,
    createShortcut,
    createTicketCategory,
} from "../services";
import { formatDate, formatDateTime, formatShortDate, getId, addImage, openDB } from "../utils";
const classes = [
    "primary",
    "secondary",
    "tertiary",
    "red",
    "orange",
    "yellow",
    "green",
    "cyan",
    "blue",
    "purple",
    "magenta",
    "pink",
    "light",
];

const fitness = [
    {
        id: getId(),
        type: "Timed",
        activity: "Run a mile",
        workouts: ["4:42", "5:04", "5:34", "6:16"],
        values: [282, 304, 334, 376],
        class: "red",
    },
    {
        id: getId(),
        type: "Duration",
        activity: "Jog",
        workouts: ["20:00", "25:00", "30:00", "35:00"],
        values: [1200, 1500, 1800, 2100],
        class: "green",
    },
    {
        id: getId(),
        type: "Count",
        activity: "Consecutive Pushups",
        workouts: ["16", "20", "35", "41"],
        values: [16, 20, 35, 41],
        class: "pink",
    },
    {
        id: getId(),
        type: "General Workout",
        activity: "Free weights",
        workouts: ["3 x 12 x 20lbs", "4 x 8 x 80lbs", "10 x 10 x 10lbs", "7 x 7 x 50lbs"],
        values: [null, null, null, null],
        class: "pink",
    },
];

const pickRandomItem = (arr: any[]) => faker.helpers.arrayElement(arr);

const pickRandomDate = (daysOne: number, daysTwo: number) => {
    const firstDate: any = dayjs().add(daysOne, "day");
    const secondDate: any = dayjs().add(daysTwo, "day");
    return dayjs(faker.date.between(firstDate, secondDate));
};

export const seedDatabase = async () => {
    console.log("Seeding database...");

    const ticketCategoryIds: string[] = [];
    const shortcutIds = [getId(), getId(), getId()];

    await createShortcut({
        shortcut_id: shortcutIds[0],
        shortcut: "stackoverflow.com",
        title: "StackOverflow",
        type: "Search",
    });
    await createShortcut({
        shortcut_id: shortcutIds[1],
        shortcut: "https://www.github.com/peterjctech",
        title: "GitHub",
        type: "Link",
    });
    await createShortcut({
        shortcut_id: shortcutIds[2],
        shortcut: "C:/Program Files/iTunes/iTunes.exe",
        title: "iTunes",
        type: "Application",
    });

    addImage({ id: shortcutIds[0], path: "C:/Users/peter/Desktop/Seed Images/stackoverflow.webp" });
    addImage({ id: shortcutIds[1], path: "C:/Users/peter/Desktop/Seed Images/github.jpg" });
    addImage({ id: shortcutIds[2], path: "C:/Users/peter/Desktop/Seed Images/itunes.png" });

    for (let i = 0; i < fitness.length; i++) {
        const obj = fitness[i];
        await createActivity({
            activity_id: obj.id,
            activity: obj.activity,
            type: obj.type,
            class: obj.class,
        });

        for (let j = 0; j < 4; j++) {
            const date = pickRandomDate(-60, 0);
            await createWorkout({
                workout_id: getId(),
                workout: obj.workouts[j],
                value: obj.values[j],
                timestamp: date.unix(),
                date: dayjs(date).format("ddd-D-MMM-YYYY"),
                activity_id: obj.id,
            });
        }
    }

    for (let i = 0; i < 4; i++) {
        const ticketCategoryId = getId();
        ticketCategoryIds.push(ticketCategoryId);

        await createTicketCategory({
            category_id: ticketCategoryId,
            category: faker.commerce.productMaterial(),
            class: pickRandomItem(classes),
        });
    }

    for (let i = 0; i < 5; i++) {
        const now: any = dayjs();
        const habitCreation: any = pickRandomDate(-60, 0);
        const habitLastBroken = faker.date.between(habitCreation, now);
        const habitLastCompleted = faker.date.between(habitLastBroken, now);

        await createQuote({
            quote_id: getId(),
            quote: `"${faker.lorem.sentence()}"`,
        });

        await createHabit({
            habit_id: getId(),
            habit: faker.color.human(),
            margin: faker.datatype.number({ min: 1, max: 7 }),
            last_completed: dayjs(habitLastCompleted).unix(),
            last_broken: dayjs(habitLastBroken).unix(),
            created_at: formatDate(habitCreation),
            timestamp: habitCreation.unix(),
            class: pickRandomItem(classes),
        });
    }

    for (let i = 0; i < 10; i++) {
        const goalDate = pickRandomDate(-7, 60);
        const noteDate = pickRandomDate(-7, 0);
        const eventDate = pickRandomDate(-14, 90);
        const goalCreated = pickRandomDate(-30, 0);

        await createGoal({
            goal_id: getId(),
            goal: faker.fake("Create product: {{commerce.product}}"),
            timestamp: goalDate.unix(),
            date: formatDate(goalDate),
            created_timestamp: goalCreated.unix(),
            created_at: formatShortDate(goalCreated),
        });

        await createNote({
            note_id: getId(),
            title: faker.name.firstName(),
            note: faker.lorem.paragraphs(),
            updated_at: formatDate(noteDate),
            timestamp: noteDate.unix(),
        });

        await createEvent({
            event_id: getId(),
            event: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            timestamp: eventDate.unix(),
            date: formatDateTime(eventDate),
        });
    }

    for (let i = 0; i < 20; i++) {
        const date = pickRandomDate(-3, 14);

        await createTicket({
            ticket_id: getId(),
            ticket: faker.commerce.productName(),
            is_focused: pickRandomItem([0, 1]),
            timestamp: date.unix(),
            date: formatDate(date),
            category_id: pickRandomItem(ticketCategoryIds),
        });
    }

    const db = await openDB();
    await db.run("INSERT INTO meta (key, value) VALUES ('is_seeded', 'true')");

    console.log("Database successfully seeded");
};
