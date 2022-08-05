import { ShortcutProps, ShortcutModel } from "../types";
import { getId } from "../utils";

export const createShortcutModel = (props: ShortcutProps) => {
    const model: ShortcutModel = {
        shortcut_id: getId(),
        shortcut: props.shortcut,
        title: props.title,
        type: props.type,
    };

    return model;
};
