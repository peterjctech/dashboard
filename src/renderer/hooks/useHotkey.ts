import { onMounted, onUnmounted } from "vue";

interface HotkeyProps {
    code: string;
    callback: Function;
    ctrl: boolean;
}

export default function (props: HotkeyProps) {
    const normalListener = (event: KeyboardEvent) => {
        if (event.code === props.code) props.callback();
    };
    const ctrlListener = (event: KeyboardEvent) => {
        if (event.ctrlKey && event.code === props.code) props.callback();
    };

    onMounted(() => {
        if (props.ctrl) {
            addEventListener("keyup", ctrlListener);
        } else {
            addEventListener("keyup", normalListener);
        }
    });
    onUnmounted(() => {
        if (props.ctrl) {
            removeEventListener("keyup", ctrlListener);
        } else {
            removeEventListener("keyup", normalListener);
        }
    });
}
