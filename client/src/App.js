import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FirebaseContext } from './components/firebase';

import GlobalStyles from './globalStyles/globalStyles';
import Header from './components/common/Header';
import pageHome from './components/pageHome';
import pageProduct from './components/pageProduct';
import pageUser from './components/pageUser';

import { setAuthData } from './redux/actions/user';

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

const App = () => {
  const firebase = useContext(FirebaseContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const httpLink = createHttpLink({
    uri: 'https://enhanced-boa-89.hasura.app/v1/graphql',
    headers: user.token ? { Authorization: `Bearer ${user.token}` } : {},
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaim =
          idTokenResult.claims['https://hasura.io/jwt/claims'];

        if (hasuraClaim) {
          dispatch(
            setAuthData({
              email: user.email,
              uid: user.uid,
              token,
            }),
          );
        } else {
          // Check if refresh is required.
          const metadataRef = firebase.database.ref(
            'metadata/' + user.uid + '/refreshTime',
          );

          metadataRef.on('value', async (data) => {
            if (!data.exists) return;
            // Force refresh to pick up the latest custom claims changes.
            const token = await user.getIdToken(true);
            dispatch(
              setAuthData({
                email: user.email,
                uid: user.uid,
                token,
              }),
            );
          });
        }
      } else {
        dispatch(setAuthData({}));
      }

      return () => {
        listener();
      };
    });
  }, [firebase, dispatch]);

  return (
    <ApolloProvider client={client}>
      <GlobalStyles />
      <Switch>
        <Header />
        <Route path="/" exact component={pageHome} />
        <Route path="/product/:id" component={pageProduct} />
        <Route path="/user/:userId" component={pageUser} />
      </Switch>
    </ApolloProvider>
  );
};

export default App;
