export default interface ElectronApi {
    ipcRenderer: Electron.IpcRenderer;
}

declare global {
    interface Window {
        electron: ElectronApi;
    }
}
