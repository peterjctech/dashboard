interface TicketCategoryModel {
    category_id: string;
    category: string;
    class: string;
}

interface EventCategoryModel {
    category_id: string;
    category: string;
    class: string;
}

interface ActivityModel {
    activity_id: string;
    activity: string;
    type: "Timed" | "Duration" | "Sets" | "Count";
    class: string;
}

interface TicketModel {
    ticket_id: string;
    ticket: string;
    is_toggled: number;
    timestamp: number;
    date: string;
    category_id: string;
    category: string;
    class: string;
    status: "Passed" | "Today" | null;
}

interface EventModel {
    event_id: string;
    event: string;
    timestamp: number;
    date: string;
    category_id: string;
    category: string;
    class: string;
    status: "Passed" | "Today" | "Upcoming" | null;
}

interface WorkoutModel {
    workout_id: string;
    workout: string;
    timestamp: number;
    date: string;
    activity_id: string;
    activity: string;
    type: "Timed" | "Duration" | "Sets" | "Count";
    class: string;
}

interface GoalModel {
    goal_id: string;
    goal: string;
    date: string;
    timestamp: number;
    created_timestamp: number;
    created_at: string;
    status: "Passed" | "Today" | "Upcoming" | null;
}

interface ShortcutModel {
    shortcut_id: string;
    shortcut: string;
    title: string;
    type: "Link" | "Application" | "Search";
    icon: string;
}

interface ReminderModel {
    reminder_id: string;
    reminder: string;
    timestamp: number;
    time: string;
}

interface AchievementModel {
    achievement_id: string;
    achievement: string;
    timestamp: number;
    date: string;
    class: string;
}

interface NoteModel {
    note_id: string;
    title: string;
    note: string;
    created_at: string;
    updated_at: string;
    timestamp: number;
}

interface HabitModel {
    habit_id: string;
    habit: string;
    margin: number;
    last_completed: number;
    last_broken: number;
    timestamp: number;
    class: string;
    created_at: string;
}

interface QuoteModel {
    quote_id: string;
    quote: string;
    image: string;
}
