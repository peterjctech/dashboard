import { useToast } from "vue-toastification";
import error from "@assets/audio/error.mp3";
import notif from "@assets/audio/notif.mp3";
import alert from "@assets/audio/alert.mp3";

const VueToast = useToast();

export const toast = {
    help: (message: string) => VueToast(message),
    success: (message: string) => VueToast.success(message),
    info: (message: string) => VueToast.info(message),
    warning: (message: string) => VueToast.warning(message),
    error: (message: string) => VueToast.error(message, { timeout: false }),
};

export const notify = {
    error: () => new Audio(error).play(),
    notif: () => new Audio(notif).play(),
    alert: () => new Audio(alert).play(),
};
