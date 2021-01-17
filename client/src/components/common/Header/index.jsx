import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { toggleSignUpModal } from '../../../redux/actions/modals';

import SearchInput from '../Search';
import { pageWidth } from '../../../globalStyles/mixins';
import { Row } from '../Flex';
import ProfileLink from '../ProfileLink';
import { AlarmButton, MenuButton } from '../IconButtons';
import { MenuContainer, MenuHeader, MenuList, MenuItem } from '../Menu';
import SignUpModal from '../auth/SignUp/index';

const HeaderContainer = styled.div`
  width: 100%;
  background-color: #c5c6c9;
  padding: 7px 0;
  position: relative;
  z-index: 10;
`;

const HeaderContent = styled.div`
  ${pageWidth};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = () => {
  const dispatch = useDispatch();

  return (
    <>
      <SignUpModal />
      <HeaderContainer>
        <HeaderContent>
          <SearchInput />
          <Row>
            <button onClick={() => dispatch(toggleSignUpModal())}>
              Sign Up
            </button>

            {/* <AlarmButton />
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
        </MenuContainer> */}
          </Row>
        </HeaderContent>
      </HeaderContainer>
    </>
  );
};

export default Header;
