import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const link = createHttpLink({
  uri: "http://127.0.0.1:8000/graphql/",
  credentials: "include",
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
