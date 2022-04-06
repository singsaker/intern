import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const uri = process.env.NODE_ENV == "production" ? "http://genfors.singsaker.no/graphql" : "http://localhost:8000/graphql/";

const link = createHttpLink({
  uri: uri,
  credentials: "include",
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
