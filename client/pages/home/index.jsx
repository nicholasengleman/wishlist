import React from 'react';
import Styled from 'styled-components';
import { getSession } from '@auth0/nextjs-auth0';

import { pageWidth } from 'globalStyles/mixins';

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
  const session = await getSession(req, res);
  const { user } = session;

  return {
    props: {
      session: user,
    },
  };
}

export default pageHome;
