import { app } from "electron";
import { existsSync, readFileSync, unlink } from "fs";
import sharp from "sharp";

export const imagesDir = (name?: string) => {
    let path = app.getPath(app.isPackaged ? "userData" : "desktop") + "/Images";
    if (name) path += "/" + name + ".jpg";
    return path;
};

export const addImage = async (props: { id: string; path: string }) => {
    const dir = imagesDir(props.id);
    await sharp(props.path).resize({ width: 512, height: 512 }).sharpen().toFile(dir);
    return;
};

export const retrieveImage = (id: string) => {
    const dir = imagesDir(id);
    if (existsSync(dir)) {
        const file = readFileSync(dir).toString("base64");
        return "data:image/jpeg;base64," + file;
    }
    return null;
};

export const removeImage = async (id: string) => {
    const dir = imagesDir(id);
    unlink(dir, (error) => {
        console.log("Failed to unlink image => ", error);
    });
    return;
};
