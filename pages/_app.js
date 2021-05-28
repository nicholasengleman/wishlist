import { UserProvider } from '@auth0/nextjs-auth0';
import { ApolloProvider } from '@apollo/client';
import Router from 'next/router';
import { Provider } from 'react-redux';
import NProgress from 'nprogress';
import { ThemeProvider } from 'styled-components';

import { useApollo } from '/lib/apolloClient';
import theme from 'globalStyles/theme';
import 'globalStyles/nprogress.css';
import store from 'redux/store';
import Page from 'components/Page';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState || {});

  return (
    <ApolloProvider client={client}>
      <UserProvider user={pageProps?.session?.user}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Page>
              <Component {...pageProps} />
            </Page>
          </ThemeProvider>
        </Provider>
      </UserProvider>
    </ApolloProvider>
  );
}

export default MyApp;
