import { createApp } from "vue";
import App from "./App.vue";
import Toast, { POSITION, TYPE } from "vue-toastification";
import { Icon } from "@vicons/utils";
import { NButton, NDataTable, NInput, NSelect, NCard, NInputNumber } from "naive-ui";
import { router } from "./router";
import VueChartkick from "vue-chartkick";
import { createPinia } from "pinia";
import "chartkick/chart.js";

const app = createApp(App);

app.use(router)
    .use(VueChartkick)
    .use(createPinia())
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
    .component("DataTable", NDataTable)
    .component("Input", NInput)
    .component("Select", NSelect)
    .component("Card", NCard)
    .component("InputNumber", NInputNumber)
    .mount("#app");
