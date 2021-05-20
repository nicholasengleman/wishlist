import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  from,
} from '@apollo/client';
import { onError } from '@apollo/link-error';
import { getDataFromTree } from '@apollo/client/react/ssr';
import withApollo from 'next-with-apollo';

function createClient({ initialState }) {
  const token = typeof window !== 'undefined' && localStorage.getItem('token');

  const httpLink = createHttpLink({
    uri: 'https://enhanced-boa-89.hasura.app/v1/graphql',
    headers: { Authorization: `Bearer engleman` },
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  return new ApolloClient({
    ssrMode: true,
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache({}).restore(initialState || {}),
  });
}

export default withApollo(createClient, { getDataFromTree });
