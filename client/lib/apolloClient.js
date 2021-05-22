import fetch from 'isomorphic-unfetch';
import { ApolloClient, ApolloLink } from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';

let accessToken = null;

const requestAccessToken = async () => {
  if (accessToken) return;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_HOST}/api/auth/session`,
  );

  if (res.ok) {
    const json = await res.json();
    accessToken = json.accessToken;
  } else {
    accessToken = null;
  }
};

// remove cached token on 401 from the server
const resetTokenLink = onError(({ networkError }) => {
  if (
    networkError &&
    networkError.name === 'ServerError' &&
    networkError.statusCode === 401
  ) {
    accessToken = null;
  }
});

const createHttpLink = (headers) => {
  const httpLink = new HttpLink({
    uri: 'https://enhanced-boa-89.hasura.app/v1/graphql',
    credentials: 'include',
    headers, // auth token is fetched on the server side
    fetch,
  });
  return httpLink;
};

const createWSLink = () => {
  return new WebSocketLink(
    new SubscriptionClient('wss://enhanced-boa-89.hasura.app/v1/graphql', {
      lazy: true,
      reconnect: true,
      connectionParams: async () => {
        await requestAccessToken(); // happens on the client
        if (accessToken) {
          return {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          };
        } else {
          return {
            headers: {},
          };
        }
      },
    }),
  );
};

export default function createApolloClient(initialState, headers) {
  const ssrMode = typeof window === 'undefined';
  let link;
  if (ssrMode) {
    link = createHttpLink(headers); // executed on server
  } else {
    link = createWSLink(); // executed on client
  }
  return new ApolloClient({
    ssrMode,
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
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
      }),
      link,
    ]),
    cache: new InMemoryCache().restore(initialState),
  });
}
