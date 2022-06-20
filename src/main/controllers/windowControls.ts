import { ipcMain, BrowserWindow } from "electron";

ipcMain.handle("minimizeWindow", () => {
    BrowserWindow.getFocusedWindow()?.minimize();
});

ipcMain.handle("maximizeWindow", () => {
    BrowserWindow.getFocusedWindow()?.maximize();
});

ipcMain.handle("closeWindow", () => {
    BrowserWindow.getFocusedWindow()?.close();
});
