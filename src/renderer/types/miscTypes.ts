export interface Settings {
    database_version: number;
    app_version: string;
    ticket_notify_time: number;
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
    type: string;
    time: string;
    timestamp: number;
    is_notified: boolean;
    is_read: boolean;
}
