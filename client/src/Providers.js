import React from 'react';
import Firebase, { FirebaseContext } from './components/firebase';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import theme from './globalStyles/theme';
import store from './redux/store';

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
