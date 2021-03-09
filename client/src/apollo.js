import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import store from './redux/store';

const { user } = store.getState();

const httpLink = createHttpLink({
  uri: 'https://enhanced-boa-89.hasura.app/v1/graphql',
  headers: user.token ? { Authorization: `Bearer ${user.token}` } : {},
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
