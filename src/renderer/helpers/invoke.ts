export const invoke = async (channel: string) => {
    await window.electron.ipcRenderer.invoke(channel);
};
