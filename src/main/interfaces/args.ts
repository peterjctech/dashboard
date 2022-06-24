export interface TicketCategoryArgs {
    category: string;
    class: string;
}

export interface ActivityArgs {
    activity: string;
    type: "Timed" | "Duration" | "Count" | "Other";
    class: string;
}

export interface TicketArgs {
    ticket: string;
    deadline: number;
    category_id: string;
}

export interface EventArgs {
    event: string;
    description: string;
    date: number;
    hour: number;
    minute: number;
}

export interface WorkoutArgs {
    value: any;
    type: "Duration" | "Timed" | "Count" | "General Workout";
    activity_id: string;
}

export interface GoalArgs {
    goal: string;
    deadline: number | "Weekly" | "Monthly" | "Quarterly" | "Yearly";
}

export interface ShortcutArgs {
    shortcut: string;
    title: string;
    type: "Link" | "Application" | "Search";
    icon: string;
}

export interface ReminderArgs {
    reminder: string;
    hour: number;
    minute: number;
    type: "Absolute" | "Relative";
}

export interface NoteArgs {
    title: string;
    note: string;
}

export interface HabitArgs {
    habit: string;
    margin: number;
    class: string;
}

export interface QuoteArgs {
    quote: string;
}
