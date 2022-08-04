import { open } from "sqlite";
import { db } from "../database";

export const openDB = () => open(db);
