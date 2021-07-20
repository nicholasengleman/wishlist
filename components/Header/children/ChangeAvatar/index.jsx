import React, { useRef } from 'react';
import Styled from 'styled-components';
import { useDispatch } from 'react-redux';

import ChangeAvatarSizeModal from 'components/Header/children/ChangeAvatarSizeModal';
import { EditButton } from 'components/IconButtons';

import {
  toggleSettingsModal,
  toggleEditAvatarModal,
} from '/redux/actions/modals';

const StyledContainer = Styled.div`
  width: 150px;
  position: relative;
  margin: -70px 0 20px 40px;

    label {
      top: 50%;
      right: -20px;
      position: absolute;
   }

  img {
    border-radius: 100%;
    border: solid 5px transparent;
    position: relative;
    background-clip: padding-box;
     &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      margin: -5px;
      border-radius: inherit; /* !importanté */
      background: linear-gradient(to right, red, orange);
    }
  }
`;

const ChangeAvatar = ({ userAvatar, setUserAvatar }) => {
  const dispatch = useDispatch();
  const inputEl = useRef();

  const handleImageUpload = () => {
    dispatch(toggleSettingsModal());
    dispatch(toggleEditAvatarModal());
    setUserAvatar(URL.createObjectURL(inputEl.current.files[0]));
  };

  return (
    <>
      <ChangeAvatarSizeModal
        userAvatar={userAvatar}
        setUserAvatar={setUserAvatar}
      />
      <StyledContainer>
        <img src={userAvatar} alt="Profile" />
        <EditButton as="label" for="profile_upload" />
        <input
          type="file"
          id="profile_upload"
          name="profile_upload"
          onChange={handleImageUpload}
          ref={inputEl}
          style={{ display: 'none' }}
        ></input>
      </StyledContainer>
    </>
  );
};

export default ChangeAvatar;
