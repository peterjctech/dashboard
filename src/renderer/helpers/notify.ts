import { useToast } from "vue-toastification";

const VueToastification = useToast();

export const toast = {
    success: (message: string) => VueToastification.success(message),
    info: (message: string) => VueToastification.info(message),
    warning: (message: string) => VueToastification.warning(message),
    error: (message: string) => VueToastification.error(message),
};

export const notify = {
    notif: () => new Audio("../assets/audio/notif.mp3").play(),
};
