import { openDB } from "../utils";
import { NoteProps, NoteModel } from "../interfaces";

export const getNotes = async () => {
    const db = await openDB();
    const data = await db.all("SELECT * FROM notes");
    data.sort((a, b) => a.timestamp - b.timestamp);
    return data;
};

export const createNote = async (props: NoteProps) => {
    const db = await openDB();
    await db.run("INSERT INTO notes (note_id, title, note, updated_at, timestamp) VALUES (?, ?, ?, ?, ?)", [
        props.note_id,
        props.title,
        props.note,
        props.updated_at,
        props.timestamp,
    ]);
    const data = await getNotes();
    return data;
};

export const updateNote = async (props: NoteModel) => {
    const db = await openDB();
    await db.run("UPDATE notes SET title = ?, note = ?, updated_at = ?, timestamp = ? WHERE note_id = ?", [
        props.title,
        props.note,
        props.updated_at,
        props.timestamp,
        props.note_id,
    ]);
    const data = await getNotes();
    return data;
};

export const deleteNote = async (props: NoteModel) => {
    const db = await openDB();
    await db.run("DELETE FROM notes WHERE note_id = ?", props.note_id);
    return props.note_id;
};
