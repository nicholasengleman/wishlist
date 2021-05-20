import { ApolloProvider } from '@apollo/client';
import NProgress from 'nprogress';
import Router from 'next/router';
import Firebase, { FirebaseContext } from 'components/firebase';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import theme from 'globalStyles/theme';
import 'globalStyles/nprogress.css';
import store from 'redux/store';
import withData from 'lib/withData';
import Page from 'components/Page';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <Provider store={store}>
        <ApolloProvider client={apollo}>
          <ThemeProvider theme={theme}>
            <Page>
              <Component {...pageProps} />
            </Page>
          </ThemeProvider>
        </ApolloProvider>
      </Provider>
    </FirebaseContext.Provider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
