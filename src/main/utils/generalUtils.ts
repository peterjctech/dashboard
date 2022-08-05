import { open } from "sqlite";
import { db } from "../database";
import { v4 as uuidv4 } from "uuid";

export const openDB = () => open(db);

export const getId = () => uuidv4();

export const colors = [
    "primary",
    "secondary",
    "tertiary",
    "red",
    "orange",
    "yellow",
    "green",
    "cyan",
    "blue",
    "purple",
    "magenta",
    "pink",
    "white",
];
