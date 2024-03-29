export interface Settings {
    database_version: number;
    app_version: string;
    ticket_notify_time: number;
    goal_notify_time: number;
    event_warning_time: number;
    habit_notify_time: number;
    zip_code: number;
    latitude: number;
    longitude: number;
}

export interface ToDo {
    id: string;
    message: string;
    redirect: string;
    color: string;
}

export interface Notification {
    id: string;
    message: string;
    time: string;
    timestamp: number;
    is_notified: boolean;
    is_read: boolean;
}
