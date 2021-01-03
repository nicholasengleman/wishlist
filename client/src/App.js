import React from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import reducer from './redux/reducers';
import GlobalStyles from './globalStyles/globalStyles';

import Header from './components/common/Header';
import pageHome from './components/pageHome';
import pageProduct from './components/pageProduct';
import pageUser from './components/pageUser';

/* eslint-disable no-underscore-dangle, no-undef */
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

const httpLink = createHttpLink({
  uri: 'https://enhanced-boa-89.hasura.app/v1/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = false;
  // return the headers to the context so httpLink can read them
  if (token) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  }
  return headers;
});

const createApolloClient = () =>
  new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

const App = () => {
  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <GlobalStyles />
        <Header />
        <Switch>
          <Route path="/" exact component={pageHome} />
          <Route path="/product/:id" component={pageProduct} />
          <Route path="/user/:userId" component={pageUser} />
        </Switch>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
