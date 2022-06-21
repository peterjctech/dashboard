import { ipcMain } from "electron";
import { NoteModel, NoteArgs } from "../interfaces";
import { getId, formatDateTime } from "../utils";
import { getNotes, createNote, updateNote, deleteNote } from "../services";
import dayjs from "dayjs";

ipcMain.handle("createNote", async (_, args: NoteArgs) => {
    if (!args.title || !args.note) return { error: "Please fill out the form properly" };

    const props = {
        note_id: getId(),
        title: args.title,
        note: args.note,
        updated_at: formatDateTime(dayjs()),
        timestamp: dayjs().unix(),
    };

    try {
        const data = await createNote(props);
        return { success: `Created note ${props.title}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to create note" };
    }
});

ipcMain.handle("getNotes", async () => {
    try {
        const data = await getNotes();
        return { data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to get notes" };
    }
});

ipcMain.handle("updateNote", async (_, args: NoteModel) => {
    const props = { ...args, timestamp: dayjs().unix(), updated_at: formatDateTime(dayjs()) };

    try {
        const data = await updateNote(props);
        return { info: `Updated note ${props.title}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to update note" };
    }
});

ipcMain.handle("deleteNote", async (_, args: NoteModel) => {
    try {
        const data = await deleteNote(args);
        return { info: `Deleted note ${args.title}`, data };
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete note" };
    }
});
