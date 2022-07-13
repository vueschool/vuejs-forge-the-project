import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "@/assets/base.css";
import "@progress/kendo-theme-default/dist/all.css";

const app = createApp(App);

app.use(router).use(createPinia());

app.mount("#app");
