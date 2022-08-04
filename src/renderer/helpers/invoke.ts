import { toast, notify } from "@helpers";

export const invoke = async (channel: string, data?: Object) => {
    if (data) data = JSON.parse(JSON.stringify(data));
    const response = await window.electron.ipcRenderer.invoke(channel, data);

    if (response?.error) {
        toast.error(response.error);
        notify.error();
    } else if (response?.help) {
        toast.help(response.help);
    } else if (response?.info) {
        toast.info(response.info);
    } else if (response?.warning) {
        toast.warning(response.warning);
    } else if (response?.success) {
        toast.success(response.success);
    }

    if (response?.data) return response.data;
};
