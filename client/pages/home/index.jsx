import React from 'react';
import Styled from 'styled-components';
import { getSession } from '@auth0/nextjs-auth0';

import { pageWidth } from 'globalStyles/mixins';
import { initializeApollo } from 'lib/apolloClient';
import GET_USER from 'queries/getUser';

import { FlexContainer } from 'components/Flex';
import ProductList from './ProductList';

const HomeContainer = Styled(FlexContainer)`
  ${pageWidth};
  margin-top: 40px;
  margin-bottom: 40px;
`;

const pageHome = () => (
  <HomeContainer>
    <ProductList />
  </HomeContainer>
);

export async function getServerSideProps({ req, res }) {
  const apolloClient = initializeApollo();
  const session = await getSession(req, res);
  const user = session?.user ?? {};

  await apolloClient.query({
    query: GET_USER,
    variables: {
      id: user?.sub || '',
    },
  });

  return {
    props: {
      session: user,
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default pageHome;
