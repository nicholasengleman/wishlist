import React from 'react';
import Firebase, { FirebaseContext } from './components/firebase';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './redux/reducers';
import { ThemeProvider } from 'styled-components';
import theme from './globalStyles/theme';

/* eslint-disable no-underscore-dangle, no-undef */
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

const Providers = ({ children }) => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Provider>
    </FirebaseContext.Provider>
  );
};

export default Providers;
