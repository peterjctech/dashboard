export interface ReminderProps {
    reminder: string;
    hour: number;
    minute: number;
    isRelative: boolean;
}

export interface ReminderModel {
    reminder_id: string;
    reminder: string;
    timestamp: number;
    time: string;
}

export interface Reminder {
    reminder_id: string;
    reminder: string;
    timestamp: number;
    time: string;
}
