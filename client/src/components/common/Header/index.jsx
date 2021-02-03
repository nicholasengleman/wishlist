import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import GET_USER from '../../../queries/getUser';
import { useQuery } from '@apollo/client';
import _ from 'lodash';

import {
  toggleSignUpModal,
  toggleSignInModal,
} from '../../../redux/actions/modals';
import { setGeneralData } from '../../../redux/actions/user';
import { FirebaseContext } from '../../firebase';

import SearchInput from '../Search';
import { pageWidth } from '../../../globalStyles/mixins';
import { Row } from '../Flex';
import ProfileLink from '../ProfileLink';
import { AlarmButton, MenuButton } from '../IconButtons';
import { MenuContainer, MenuHeader, MenuList, MenuItem } from '../Menu';
import SignUpModal from '../auth/SignUp/index';
import SignInModal from '../auth/SignIn/index';
import { LightButton } from '../Button';

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
  const userUid = useSelector((state) => state.user?.auth.uid);
  const localGeneralData = useSelector((state) => state.user?.general);
  const firebase = useContext(FirebaseContext);

  const { loading, data } = useQuery(GET_USER, {
    variables: { user_id: userUid },
  });

  if (data) {
    const hasuraGeneralData = data?.users_by_pk;
    if (!_.isEqual(localGeneralData, hasuraGeneralData)) {
      dispatch(
        setGeneralData({
          ...hasuraGeneralData,
        }),
      );
    }
  }

  const handleSignOut = () => {
    firebase.doSignOut();
    dispatch(setGeneralData({}));
  };

  return (
    <>
      <SignUpModal />
      <SignInModal />
      <HeaderContainer>
        <HeaderContent>
          <SearchInput />
          <Row>
            {userUid ? (
              <>
                <AlarmButton />
                <ProfileLink />
                <MenuContainer>
                  <MenuHeader>
                    <MenuButton />
                  </MenuHeader>
                  <MenuList>
                    <MenuItem onClick={() => handleSignOut()}>
                      <i className="fas fa-sign-out-alt" />
                      <p>Log Out</p>
                    </MenuItem>
                  </MenuList>
                </MenuContainer>
              </>
            ) : (
              <>
                <LightButton onClick={() => dispatch(toggleSignUpModal())}>
                  Sign Up
                </LightButton>

                <LightButton onClick={() => dispatch(toggleSignInModal())}>
                  Sign In
                </LightButton>
              </>
            )}
          </Row>
        </HeaderContent>
      </HeaderContainer>
    </>
  );
};

export default Header;
