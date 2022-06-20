import { IpcRenderer } from "electron";

const ipcRenderer = window.electron.ipcRenderer as IpcRenderer;

export { ipcRenderer };
