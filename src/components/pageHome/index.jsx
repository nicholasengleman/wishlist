import React from 'react';
import Styled from 'styled-components';
import { FlexContainer } from '../common/Flex';
import { pageWidth } from '../../globalStyles/mixins';
import ProductList from './children/ProductList';

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

export default pageHome;
