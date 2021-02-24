import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client/core";
import { onError } from "@apollo/link-error";
import { createUploadLink } from "apollo-upload-client";
import { useMemo } from "react";
import fetch from "isomorphic-unfetch";

const isBrowser = typeof window !== "undefined";
let apolloClient = null;

// http link
const httpLink = createUploadLink({
  uri: `https://${process.env.NEXT_PUBLIC_SITE_URL}/api/graphql`,
  credentials: "include", // Additional fetch() options like `credentials` or `headers`
  fetch,
});

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map((err) => {
      console.warn(err.message);
    });
  }
  if (networkError) {
    console.warn(networkError);
  }
});

// create an apollo client
function createApolloClient() {
  return new ApolloClient({
    ssrMode: !isBrowser,
    link: ApolloLink.from([errorLink, httpLink]),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);

  return store;
}
