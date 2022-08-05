import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import { NButton, NCard, NTabs, NTabPane, NInput, NDataTable, NSelect, NInputNumber, NSwitch } from "naive-ui";
import { Icon, Form } from "@common";
import { createPinia } from "pinia";

const app = createApp(App);

app.use(Toast, {
    transition: "toast",
    position: "bottom-left",
    hideProgressBar: true,
    timeout: 2000,
})
    .use(createPinia())
    .use(router)
    .component("Button", NButton)
    .component("Card", NCard)
    .component("Tabs", NTabs)
    .component("TabPane", NTabPane)
    .component("Input", NInput)
    .component("DataTable", NDataTable)
    .component("Select", NSelect)
    .component("InputNumber", NInputNumber)
    .component("Switch", NSwitch)
    .component("Icon", Icon)
    .component("Form", Form)
    .mount("#app");
