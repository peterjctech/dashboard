export interface TicketCategoryProps {
    category_id: string;
    category: string;
    class: string;
}

export interface EventCategoryProps {
    category_id: string;
    category: string;
    class: string;
}

export interface ActivityProps {
    activity_id: string;
    activity: string;
    type: string;
    class: string;
}

export interface TicketProps {
    ticket_id: string;
    ticket: string;
    is_focused: number;
    timestamp: number;
    date: string;
    category_id: string;
}

export interface EventProps {
    event_id: string;
    event: string;
    description: string;
    timestamp: number;
    date: string;
    category_id: string;
}

export interface RescheduleEventProps {
    event_id: string;
    event: string;
    timestamp: number;
    date: string;
}

export interface WorkoutProps {
    workout_id: string;
    workout: number;
    timestamp: number;
    date: string;
    activity_id: string;
}

export interface GoalProps {
    goal_id: string;
    goal: string;
    date: string;
    timestamp: number;
    created_timestamp: number;
    created_at: string;
}

export interface ShortcutProps {
    shortcut_id: string;
    shortcut: string;
    title: string;
    type: "Link" | "Application" | "Search";
}

export interface ReminderProps {
    reminder_id: string;
    reminder: string;
    timestamp: number;
    time: string;
}

export interface AchievementProps {
    achievement_id: string;
    achievement: string;
    timestamp: number;
    date: string;
    class: string;
}

export interface NoteProps {
    note_id: string;
    title: string;
    note: string;
    updated_at: string;
    timestamp: number;
}

export interface HabitProps {
    habit_id: string;
    habit: string;
    margin: number;
    last_completed: number;
    last_broken: number;
    created_at: string;
    timestamp: number;
    class: string;
}

export interface QuoteProps {
    quote_id: string;
    quote: string;
}
