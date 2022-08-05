export interface NoteProps {
    title: string;
    note: string;
}

export interface NoteModel {
    note_id: string;
    title: string;
    note: string;
    color: string;
    updated_at: string;
    timestamp: number;
}

export interface Note {
    note_id: string;
    title: string;
    note: string;
    color: string;
    updated_at: string;
    timestamp: number;
}
