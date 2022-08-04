import { app, BrowserWindow } from "electron";
import { join } from "path";
import { init } from "./database";

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

    mainWindow.maximize();

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
