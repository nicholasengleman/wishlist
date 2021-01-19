import React from 'react';
import Firebase, { FirebaseContext } from './components/firebase';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import reducer from './redux/reducers';

/* eslint-disable no-underscore-dangle, no-undef */
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

const httpLink = createHttpLink({
  uri: 'https://enhanced-boa-89.hasura.app/v1/graphql',
  headers: {},
});

const createApolloClient = () =>
  new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

const Providers = ({ children }) => {
  const client = createApolloClient();

  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <ApolloProvider client={client}>
        <Provider store={store}>{children}</Provider>
      </ApolloProvider>
    </FirebaseContext.Provider>
  );
};

export default Providers;
