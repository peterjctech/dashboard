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

ipcMain.handle("openApplication", (_, props) => {
    spawn(props.path);
});
