import React from 'react';
import styled from 'styled-components';
import SearchInput from '../Search';
import Avatar from '../Avatar';
import { RowFlexEnd } from '../Row';
import { MenuContainer, MenuButton, MenuList, MenuItem } from '../Menu';

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
  margin-right: 10px;
`;

const Header = () => (
  <HeaderContainer>
    <HeaderContent>
      <SearchInput />
      <RowFlexEnd>
        <MenuContainer>
          <MenuButton>
            <HeaderAvatar size="0" />
            <p>Hello, Nicsdsds</p>
          </MenuButton>
          <MenuList>
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </MenuList>
        </MenuContainer>
      </RowFlexEnd>
    </HeaderContent>
  </HeaderContainer>
);

export default Header;
