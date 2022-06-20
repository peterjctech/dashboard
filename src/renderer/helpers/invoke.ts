import { toast } from "@helpers";

export const invoke = async (channel: string, data?: Object) => {
    if (data) data = JSON.parse(JSON.stringify(data));
    const response = await window.electron.ipcRenderer.invoke(channel, data);

    if (response) {
        if (response.error) {
            toast.error(response.error);
        } else if (response.success) {
            toast.success(response.success);
        } else if (response.info) {
            toast.info(response.info);
        } else if (response.warning) {
            toast.warning(response.warning);
        }
    }

    if (response.data) return response.data;
};
