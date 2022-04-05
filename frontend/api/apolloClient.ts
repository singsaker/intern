import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const uri = typeof window === "undefined" ? "http://127.0.0.1:8000/graphql/" : "http://genfors.singsaker.no:1337/graphql/";

const link = createHttpLink({
  uri: uri,
  credentials: "include",
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
