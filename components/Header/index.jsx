import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useUser } from '@auth0/nextjs-auth0';

import { pageWidth } from '/globalStyles/mixins';
import { toggleSettingsModal } from 'redux/actions/modals';

import SearchInput from 'components/Search';
import { Row, Column } from 'components/Flex';
import ProfileLink from 'components/ProfileLink';
import { AlarmButton, MenuButton, HomeButton } from 'components/IconButtons';
import EditProfileModal from 'components/Header/EditProfileModal';
import {
  MenuContainer,
  MenuHeader,
  MenuList,
  MenuItem,
} from 'components/MenuDropDown';
import { NavButton } from '/components/Buttons/NavButton';

const HeaderContainer = styled.div`
  width: 100%;
  background-color: white;
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

const Header = ({ session }) => {
  const dispatch = useDispatch();
  const { user, error, isLoading } = useUser();

  return (
    <>
      <EditProfileModal />
      <HeaderContainer>
        <HeaderContent>
          <Row marginSize={0}>
            <HomeButton />
            <SearchInput />
          </Row>
          <Row marginSize={0} width="auto">
            {user ? (
              <>
                <AlarmButton />
                <ProfileLink />
                <MenuContainer>
                  <MenuHeader>
                    <MenuButton />
                  </MenuHeader>
                  <MenuList>
                    <MenuItem onClick={() => dispatch(toggleSettingsModal())}>
                      <i className="fas fa-sign-out-alt" />
                      <p>Edit Profile</p>
                    </MenuItem>
                    <MenuItem href="/api/auth/logout">
                      <i className="fas fa-sign-out-alt" />
                      <p>Logout</p>
                    </MenuItem>
                  </MenuList>
                </MenuContainer>
              </>
            ) : (
              <>
                <Column>
                  <NavButton href="/api/auth/login">
                    Log in or Sign Up
                  </NavButton>
                </Column>
              </>
            )}
          </Row>
        </HeaderContent>
      </HeaderContainer>
    </>
  );
};

export default Header;
