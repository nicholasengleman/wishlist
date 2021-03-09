import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  toggleSignUpModal,
  toggleSignInModal,
  toggleEditProfileModal,
} from '../../../redux/actions/modals';
import { FirebaseContext } from '../../firebase';

import SearchInput from '../Search';
import { pageWidth } from '../../../globalStyles/mixins';
import { Row, Column } from '../Flex';
import ProfileLink from '../ProfileLink';
import { AlarmButton, MenuButton, HomeButton } from '../IconButtons';
import {
  MenuContainer,
  MenuHeader,
  MenuList,
  MenuItem,
} from '../EditProfileMenu';
import SignUpModal from '../auth/SignUp/index';
import SignInModal from '../auth/SignIn/index';
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
  const firebase = useContext(FirebaseContext);
  const userUid = useSelector((state) => state.user?.uid);

  const handleSignOut = () => {
    firebase.doSignOut();
  };

  return (
    <>
      <SignUpModal />
      <SignInModal />
      <HeaderContainer>
        <HeaderContent>
          <Row marginSize={0}>
            <HomeButton />
            <SearchInput />
          </Row>
          <Row marginSize={0}>
            {userUid ? (
              <>
                <AlarmButton />
                <ProfileLink />
                <MenuContainer>
                  <MenuHeader>
                    <MenuButton />
                  </MenuHeader>
                  <MenuList>
                    <MenuItem
                      onClick={() => dispatch(toggleEditProfileModal())}
                    >
                      <i className="fas fa-sign-out-alt" />
                      <p>Edit Profile</p>
                    </MenuItem>
                    <MenuItem onClick={() => handleSignOut()}>
                      <i className="fas fa-sign-out-alt" />
                      <p>Log Out</p>
                    </MenuItem>
                  </MenuList>
                </MenuContainer>
              </>
            ) : (
              <>
                <Column>
                  <LightButton onClick={() => dispatch(toggleSignUpModal())}>
                    Sign Up
                  </LightButton>
                </Column>

                <Column>
                  <LightButton onClick={() => dispatch(toggleSignInModal())}>
                    Sign In
                  </LightButton>
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
