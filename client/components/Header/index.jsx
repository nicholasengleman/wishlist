import React, { useContext } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  toggleSignUpModal,
  toggleSignInModal,
  toggleSettingsModal,
} from '../../redux/actions/modals';

import SearchInput from '../Search';
import { pageWidth } from '../../globalStyles/mixins';
import { Row, Column } from '../Flex';
import ProfileLink from '../ProfileLink';
import { AlarmButton, MenuButton, HomeButton } from '../IconButtons';
import EditProfileModal from './EditProfile';
import {
  MenuContainer,
  MenuHeader,
  MenuList,
  MenuItem,
} from '../EditProfileMenu';
import { LightButton } from '../Button';

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

const Header = () => {
  const dispatch = useDispatch();
  const userUid = useSelector((state) => state.user?.uid);

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
            {userUid ? (
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
                    <MenuItem>
                      <i className="fas fa-sign-out-alt" />
                      <p>Log Out</p>
                    </MenuItem>
                  </MenuList>
                </MenuContainer>
              </>
            ) : (
              <>
                <Column>
                  <Link href="/api/auth/login">Log in or Sign Up</Link>
                </Column>
                <Column>
                  <Link href="/api/auth/logout">Logout</Link>
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
