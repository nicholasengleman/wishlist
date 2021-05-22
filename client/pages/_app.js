import NProgress from 'nprogress';
import { UserProvider } from '@auth0/nextjs-auth0';
import Router from 'next/router';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import theme from 'globalStyles/theme';
import 'globalStyles/nprogress.css';
import store from 'redux/store';
import { withApollo } from 'lib/withApollo';
import Page from 'components/Page';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ThemeProvider>
      </Provider>
    </UserProvider>
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

export default withApollo()(MyApp);
