export interface TicketCategoryModel {
    category_id: string;
    category: string;
    class: string;
}

export interface ActivityModel {
    activity_id: string;
    activity: string;
    type: "Timed" | "Duration" | "Sets" | "Count";
    class: string;
}

export interface TicketModel {
    ticket_id: string;
    ticket: string;
    is_focused: number;
    timestamp: number;
    date: string;
    category_id: string;
    category: string;
    class: string;
    status: "Passed" | "Today" | null;
}

export interface EventModel {
    event_id: string;
    event: string;
    description: string;
    timestamp: number;
    date: string;
    status: string;
    class: string;
}

export interface WorkoutModel {
    workout_id: string;
    value: number;
    timestamp: number;
    date: string;
    activity_id: string;
    activity: string;
    type: "Timed" | "Duration" | "Count";
    class: string;
}

export interface GoalModel {
    goal_id: string;
    goal: string;
    date: string;
    timestamp: number;
    created_timestamp: number;
    created_at: string;
    status: "Passed" | "Today" | "Upcoming" | null;
    class: string;
}

export interface ShortcutModel {
    shortcut_id: string;
    shortcut: string;
    title: string;
    type: "Link" | "Application" | "Search";
    icon: string;
}

export interface ReminderModel {
    reminder_id: string;
    reminder: string;
    timestamp: number;
    time: string;
}

export interface NoteModel {
    note_id: string;
    title: string;
    note: string;
    updated_at: string;
    timestamp: number;
}

export interface HabitModel {
    habit_id: string;
    habit: string;
    margin: number;
    last_completed: number;
    last_broken: number;
    timestamp: number;
    class: string;
    created_at: string;
}

export interface QuoteModel {
    quote_id: string;
    quote: string;
}
