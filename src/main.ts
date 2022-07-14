import { createApp, provide, h } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "@/assets/base.css";
import "@progress/kendo-theme-default/dist/all.css";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "@/graphql/apolloClient";

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});

app.use(router).use(createPinia());

app.mount("#app");
