import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
const httpLink = createHttpLink({
  uri: "https://api.8base.com/cl5ittcmt05gm09kz812y1b3t",
});

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});
