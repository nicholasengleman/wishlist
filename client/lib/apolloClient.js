import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
import { onError } from 'apollo-link-error';
import { setContext } from '@apollo/client/link/context';
import { useMemo } from 'react';
import fetch from 'isomorphic-unfetch';
import { requestAccessToken } from './requestAccessTokens';

let apolloClient;

const errorHandling = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError)
    if (typeof networkError === 'object') {
      console.log(networkError);
    } else {
      console.log(
        `[Network error]: ${networkError}. Backend is unreachable. Is it running?`,
      );
    }
});

const httpLink = new HttpLink({
  uri: 'https://enhanced-boa-89.hasura.app/v1/graphql',
  credentials: 'include',
  fetch,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await requestAccessToken();
  if (token) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  } else {
    return {
      headers: {
        ...headers,
      },
    };
  }
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([errorHandling, authLink, httpLink]),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cache data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') {
    return _apolloClient;
  }

  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return apolloClient;
}

export function useApollo(initialState = null) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
