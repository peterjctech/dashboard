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
}

interface EventModel {
    event_id: string;
    event: string;
    timestamp: number;
    date: string;
    category_id: string;
    category: string;
    class: string;
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
    is_due: boolean;
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
