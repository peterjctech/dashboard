import { ref } from "vue";
import { InputInst } from "naive-ui";

export default function () {
    const inputRef = ref<null | InputInst>(null);
    const focusInput = () => inputRef.value?.focus();

    return { inputRef, focusInput };
}
