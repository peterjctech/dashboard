export interface EventProps {
    event: string;
    description: string;
    timestamp: number;
}

export interface EventModel {
    event_id: string;
    event: string;
    description: string;
    timestamp: number;
    date: string;
    time: string;
}

export interface Event {
    event_id: string;
    event: string;
    description: string;
    timestamp: number;
    date: string;
    status: string;
    color: string;
    time: string;
}
