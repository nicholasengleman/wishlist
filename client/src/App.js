import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import GlobalStyles from './globalStyles/globalStyles';
import Header from './components/common/Header';
import pageHome from './components/pageHome';
import pageProduct from './components/pageProduct';
import pageUser from './components/pageUser';

import { setAuthUser } from './redux/actions/authUser';
import { FirebaseContext } from './components/firebase';

const App = () => {
  const dispatch = useDispatch();
  const firebase = useContext(FirebaseContext);
  let listener = '';

  useEffect(() => {
    listener = firebase.auth.onAuthStateChanged((authUser) => {
      const user = {};
      if (authUser) {
        user.email = authUser.email;
        user.uid = authUser.uid;
      }
      dispatch(setAuthUser(user));
    });

    return () => {
      listener();
    };
  });

  return (
    <>
      <GlobalStyles />
      <Header />
      <Switch>
        <Route path="/" exact component={pageHome} />
        <Route path="/product/:id" component={pageProduct} />
        <Route path="/user/:userId" component={pageUser} />
      </Switch>
    </>
  );
};

export default App;
