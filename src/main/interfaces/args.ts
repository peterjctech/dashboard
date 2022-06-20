export interface TicketCategoryArgs {
    category: string;
    class?: string;
}

export interface EventCategoryArgs {
    category: string;
    class?: string;
}

export interface ActivityArgs {
    activity: string;
    type: "Timed" | "Duration" | "Sets" | "Count";
    class?: string;
}

export interface TicketArgs {
    ticket: string;
    deadline?: number;
    category_id?: string;
}

export interface EventArgs {
    event: string;
    date: number;
    category_id?: string;
}

export interface WorkoutArgs {
    workout: string;
    date: number;
    activity_id: string;
}

export interface GoalArgs {
    goal: string;
    deadline?: number | "Weekly" | "Monthly" | "Quarterly" | "Yearly";
}

export interface ShortcutArgs {
    shortcut: string;
    title: string;
    type: "Link" | "Application" | "Search";
    icon?: string;
}

export interface ReminderArgs {
    reminder: string;
    absolute?: number;
    relative_number?: number;
    relative_unit?: "minutes" | "hours" | "days";
}

export interface AchievementArgs {
    achievement: string;
    date?: number;
    class: string;
}

export interface NoteArgs {
    title: string;
    note: string;
}

export interface HabitArgs {
    habit: string;
    margin: number;
    class?: string;
}

export interface QuoteArgs {
    quote: string;
    image_url?: string;
}
