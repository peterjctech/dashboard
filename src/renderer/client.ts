import { createApp } from "vue";
import App from "./App.vue";
import { Icon } from "@vicons/utils";
import { NButton } from "naive-ui";
import { router } from "./router";

const app = createApp(App);

app.use(router).component("Button", NButton).component("Icon", Icon).mount("#app");
