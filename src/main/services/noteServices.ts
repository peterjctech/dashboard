import { openDB } from "../utils";
import { NoteProps, NoteModel } from "../interfaces";

export const getNotes = async () => {
    const db = await openDB();
    const data = await db.all("SELECT * FROM notes");
    data.sort((a, b) => b.timestamp - a.timestamp);
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

export const updateNote = async (args: NoteModel) => {
    const db = await openDB();
    await db.run("UPDATE notes SET title = ?, note = ?, updated_at = ?, timestamp = ? WHERE note_id = ?", [
        args.title,
        args.note,
        args.updated_at,
        args.timestamp,
        args.note_id,
    ]);
    const data = await getNotes();
    return data;
};

export const deleteNote = async (args: NoteModel) => {
    const db = await openDB();
    await db.run("DELETE FROM notes WHERE note_id = ?", args.note_id);
    return args.note_id;
};
