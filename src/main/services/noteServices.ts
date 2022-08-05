import dayjs from "dayjs";
import { NoteModel, NoteProps } from "../types";
import { getId, colors, formatDate } from "../utils";

export const createNoteModel = (props: NoteProps) => {
    const timestamp = dayjs().unix();

    const model: NoteModel = {
        note_id: getId(),
        title: props.title,
        note: props.note,
        color: colors[(colors.length * Math.random()) | 0],
        updated_at: formatDate(timestamp, "shortdatetime"),
        timestamp,
    };

    return model;
};
