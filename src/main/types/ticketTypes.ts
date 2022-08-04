export interface TicketProps {
    ticket: string;
    deadline: number;
    category_id: string;
}

export interface TicketModel {
    ticket_id: string;
    ticket: string;
    is_focused: number;
    timestamp: number;
    date: string;
    category_id: string;
}

export interface Ticket {
    ticket_id: string;
    ticket: string;
    is_focused: boolean;
    timestamp: number;
    date: string;
    category_id: string;
    category: string;
    color: string;
    status: string;
}
