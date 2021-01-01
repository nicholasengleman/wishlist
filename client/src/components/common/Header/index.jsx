import React from 'react';
import styled from 'styled-components';
import SearchInput from '../Search';
import { pageWidth } from '../../../globalStyles/mixins';
import { Row } from '../Flex';
import ProfileLink from '../ProfileLink';
import { AlarmButton, MenuButton } from '../IconButtons';

import { MenuContainer, MenuHeader, MenuList, MenuItem } from '../Menu';

const HeaderContainer = styled.div`
  width: 100%;
  background-color: #c5c6c9;
  padding: 5px 0;
`;

const HeaderContent = styled.div`
  ${pageWidth};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = () => (
  <HeaderContainer>
    <HeaderContent>
      <SearchInput />
      <Row>
        <AlarmButton />
        <ProfileLink />
        <MenuContainer>
          <MenuHeader>
            <MenuButton />
          </MenuHeader>
          <MenuList>
            <MenuItem>
              <i className="fas fa-sign-in-alt" />
              <p>Log In</p>
            </MenuItem>
            <MenuItem>
              <i className="fas fa-sign-out-alt" />
              <p>Log Out</p>
            </MenuItem>
          </MenuList>
        </MenuContainer>
      </Row>
    </HeaderContent>
  </HeaderContainer>
);

export default Header;
