import { ipcMain } from "electron";
import { openDB, formatDate } from "../utils";
import { NoteProps, Note } from "../types";
import { createNoteModel } from "../services";
import dayjs from "dayjs";

interface GetNoteProps {
    type: string;
}

ipcMain.handle("createNote", async (_, props: NoteProps) => {
    if (!props.note) return { warning: "You must input a note" };
    const model = createNoteModel(props);

    try {
        const db = await openDB();
        await db.run(
            "INSERT INTO notes (note_id, title, note, color, updated_at, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [model.note_id, model.title, model.note, model.color, model.updated_at, model.timestamp]
        );

        return { success: `Created note ${model.note}`, data: model };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create note" };
    }
});

ipcMain.handle("getNotes", async () => {
    try {
        const db = await openDB();
        const data = await db.all("SELECT * FROM notes");
        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get notes" };
    }
});

ipcMain.handle("updateNote", async (_, props: Note) => {
    const model = {
        ...props,
        updated_at: formatDate(dayjs(), "shortdatetime"),
        timestamp: dayjs().unix(),
    };
    try {
        const db = await openDB();
        await db.run("UPDATE notes SET note = ?, updated_at = ?, timestamp = ? WHERE note_id = ?", [
            model.note,
            model.updated_at,
            model.timestamp,
            model.note_id,
        ]);
        return { help: `Updated note ${model.note}`, data: model };
    } catch (error) {
        console.log(error);
        return { error: "Failed to update note" };
    }
});

ipcMain.handle("deleteNote", async (_, props: Note) => {
    try {
        const db = await openDB();
        await db.run("DELETE FROM notes WHERE note_id = ?", props.note_id);
        return { info: `Deleted note ${props.note}`, data: props.note_id };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete note" };
    }
});
