import { ipcMain, BrowserWindow } from "electron";
import { spawn } from "node:child_process";

ipcMain.handle("minimizeWindow", () => {
    BrowserWindow.getFocusedWindow()?.minimize();
});

ipcMain.handle("maximizeWindow", () => {
    BrowserWindow.getFocusedWindow()?.maximize();
});

ipcMain.handle("closeWindow", () => {
    BrowserWindow.getFocusedWindow()?.close();
});

ipcMain.handle("openApplication", (_, args) => {
    spawn(args.path);
});
