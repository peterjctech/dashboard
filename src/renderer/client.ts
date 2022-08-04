import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import { NButton } from "naive-ui";
import { Icon } from "@common";

const app = createApp(App);

app.use(Toast, {
    transition: "toast",
    position: "bottom-left",
    hideProgressBar: true,
    timeout: 2000,
})
    .use(router)
    .component("Button", NButton)
    .component("Icon", Icon)
    .mount("#app");
