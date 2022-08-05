export interface HabitProps {
    habit: string;
    frequency: number;
}

export interface HabitModel {
    habit_id: string;
    habit: string;
    frequency: number;
    last_completed: number;
    last_broken: number;
    next_due: number;
}

export interface Habit {
    habit_id: string;
    habit: string;
    frequency: number;
    last_completed: number;
    last_broken: number;
    next_due: number;
    color: string;
    due_date: string;
    streak: string;
}
