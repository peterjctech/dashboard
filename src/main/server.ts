import { app, BrowserWindow } from "electron";
import path from "path";
import contextMenu from "electron-context-menu";
import { init } from "./database";
import "./controllers";

init();

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    mainWindow.maximize();
    contextMenu();

    mainWindow.webContents.on("new-window", (e, url) => {
        e.preventDefault();
        require("electron").shell.openExternal(url);
    });

    if (process.env.NODE_ENV === "development") {
        const rendererPort = process.argv[2];
        mainWindow.loadURL(`http://localhost:${rendererPort}`);
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), "renderer", "index.html"));
    }
};

app.whenReady().then(() => {
    createWindow();

    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});
