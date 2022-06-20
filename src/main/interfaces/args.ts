interface TicketCategoryArgs {
    category: string;
    class: string;
}

interface EventCategoryArgs {
    category: string;
    class: string;
}

interface ActivityArgs {
    activity: string;
    type: "Timed" | "Duration" | "Sets" | "Count";
    class: string;
}

interface TicketArgs {
    ticket: string;
    deadline?: number;
    category_id?: string;
}

interface EventArgs {
    event: string;
    date: number;
    category_id?: string;
}

interface WorkoutArgs {
    workout: string;
    date: number;
    activity_id: string;
}

interface GoalArgs {
    goal: string;
    deadline?: number | "Weekly" | "Monthly" | "Quarterly" | "Yearly";
}

interface ShortcutArgs {
    shortcut: string;
    title: string;
    type: "Link" | "Application" | "Search";
    icon?: string;
}

interface ReminderArgs {
    reminder: string;
    minutes?: number;
    time?: number;
}

interface AchievementArgs {
    achievement: string;
    date: number;
    class: string;
}

interface NoteArgs {
    title: string;
    note: string;
}
