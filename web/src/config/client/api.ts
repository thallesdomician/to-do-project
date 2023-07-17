import { ApolloClient, InMemoryCache } from "@apollo/client";

const NEXT_PUBLIC_API = process.env.NEXT_PUBLIC_API;

const client = new ApolloClient({
  uri: NEXT_PUBLIC_API,
  cache: new InMemoryCache(),
});

export default client;
