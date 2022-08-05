import { app, BrowserWindow } from "electron";
import contextMenu from "electron-context-menu";
import Badge from "electron-windows-badge";
import { join } from "path";
import { init } from "./database";
import "./controllers";

async function createWindow() {
    await init();

    const mainWindow = new BrowserWindow({
        frame: false,
        webPreferences: {
            preload: join(__dirname, "preload.js"),
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    new Badge(mainWindow);
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
        mainWindow.loadFile(join(app.getAppPath(), "renderer", "index.html"));
    }
}

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
