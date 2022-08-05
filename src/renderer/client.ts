import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import { NButton } from "naive-ui";
import { Icon } from "@common";
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
    .component("Icon", Icon)
    .mount("#app");
