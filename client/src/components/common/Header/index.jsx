import React from 'react';
import styled from 'styled-components';
import SearchInput from '../Search';
import { RowFlexEnd } from '../Row';
import {
  MenuContainer,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemCategory,
} from '../Menu';

const HeaderContainer = styled.div`
  width: 100%;
  background-color: #f7f8fb;
`;

const HeaderContent = styled.div`
  max-width: 1440px;
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .fas {
    color: blue;
    margin-right: 10px;
  }

  .fas.fa-angle-down {
    color: #c3cad6;
  }
`;

const Header = () => (
  <HeaderContainer>
    <HeaderContent>
      <SearchInput />
      <RowFlexEnd>
        <MenuContainer>
          <MenuButton>
            <i className="fas fa-cog" />
            <p>Manage</p>
            <i className="fas fa-angle-down" />
          </MenuButton>
          <MenuList>
            <MenuItemCategory>Account</MenuItemCategory>
            <MenuItem>
              <i className="fas fa-sign-in-alt" />
              Log In...
            </MenuItem>
            <MenuItem>
              <i className="fas fa-sign-out-alt" />
              Log Out...
            </MenuItem>
          </MenuList>
        </MenuContainer>
      </RowFlexEnd>
    </HeaderContent>
  </HeaderContainer>
);

export default Header;
