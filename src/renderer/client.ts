import { createApp } from "vue";
import App from "./App.vue";
import Toast, { POSITION, TYPE } from "vue-toastification";
import { Icon } from "@vicons/utils";
import { NButton, NModal, NDataTable, NInput, NSelect } from "naive-ui";
import { router } from "./router";

const app = createApp(App);

app.use(router)
    .use(Toast, {
        transition: "Vue-Toastification__fade",
        position: POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
        timeout: 2000,
        toastDefaults: {
            [TYPE.ERROR]: {
                timeout: false,
            },
        },
    })
    .component("Button", NButton)
    .component("Icon", Icon)
    .component("Modal", NModal)
    .component("DataTable", NDataTable)
    .component("Input", NInput)
    .component("Select", NSelect)
    .mount("#app");
