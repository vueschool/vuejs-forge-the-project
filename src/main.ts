import { createApp, provide, h } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "@/assets/base.css";
import "@progress/kendo-theme-default/dist/all.css";
import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'


const httpLink = createHttpLink({
  uri: 'https://api.8base.com/cl5ittcmt05gm09kz812y1b3t'
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})


const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

app.use(router).use(createPinia());

app.mount("#app");
