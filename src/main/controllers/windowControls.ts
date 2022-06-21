import { ipcMain, BrowserWindow, dialog, app } from "electron";
import { readFileSync } from "fs";

ipcMain.handle("minimizeWindow", () => {
    BrowserWindow.getFocusedWindow()?.minimize();
});

ipcMain.handle("maximizeWindow", () => {
    BrowserWindow.getFocusedWindow()?.maximize();
});

ipcMain.handle("closeWindow", () => {
    BrowserWindow.getFocusedWindow()?.close();
});
