import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { open } from "sqlite";
import { db } from "../database";
import { v4 as uuidv4 } from "uuid";
import { app } from "electron";
import { readFileSync, existsSync, unlink } from "fs";
import sharp from "sharp";

dayjs.extend(advancedFormat);

interface AddImageArgs {
    id: string;
    path: string;
    width?: number;
    height?: number;
}

export const openDB = () => open(db);

export const getId = () => uuidv4();

export const formatDate = (date: dayjs.Dayjs) => dayjs(date).format("dddd, Do MMMM, YYYY");

export const formatShortDate = (date: dayjs.Dayjs) => dayjs(date).format("D-MMM-YYYY");

export const formatDateTime = (date: dayjs.Dayjs) => dayjs(date).format("HH:mm on dddd, Do MMMM, YYYY");

export const imagesDir = (name?: string) => {
    let path = app.getPath("userData") + "/Images";
    if (name) path = path + "/" + name + ".jpg";

    return path;
};

export const addImage = (args: AddImageArgs) => {
    const dir = app.getPath("userData") + "/Images/" + args.id + ".jpg";
    sharp(args.path)
        .resize({ width: args.width || 512, height: args.height || 512 })
        .sharpen()
        .toFile(dir);
};

export const retrieveImage = (id: string) => {
    const dir = imagesDir(id);

    if (existsSync(dir)) {
        const file = readFileSync(dir).toString("base64");
        return "data:image/jpeg;base64," + file;
    }

    return null;
};

export const removeImage = (id: string) => {
    const dir = imagesDir(id);
    try {
        unlink(dir, (error) => {
            console.log(error);
        });
        return true;
    } catch (error) {
        return false;
    }
};
