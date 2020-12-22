import React from 'react';
import styled from 'styled-components';
import SearchInput from '../Search';
import Avatar from '../Avatar';
import { RowFlexEnd } from '../Row';

const HeaderContainer = styled.div`
  width: 100%;
  background-color: lightblue;
`;

const HeaderContent = styled.div`
  max-width: 1440px;
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderAvatar = styled(Avatar)`
  border: 3px solid white;
  margin: 0 20px;
`;

const Header = () => (
  <HeaderContainer>
    <HeaderContent>
      <SearchInput />
      <RowFlexEnd>
        <HeaderAvatar size="2" />
        <p>Hello, Nicholas</p>
      </RowFlexEnd>
    </HeaderContent>
  </HeaderContainer>
);

export default Header;
