import React, { useRef } from 'react';
import Styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { EditButton } from 'components/IconButtons';
import ChangeProfileImgModal from './children/ChangeProfileImgModal';
import ProfileImg from './children/ProfileImg';

import {
  toggleSettingsModal,
  toggleEditAvatarModal,
} from '/redux/actions/modals';

const AvatarContainer = Styled.div`
  width: 225px;
  position: relative;
  margin: -130px 0 20px 100px;

    label {
      top: 50%;
      right: -20px;
      position: absolute;
   }
`;

const Avatar = ({ userAvatar, setUserAvatar, size, editable }) => {
  const dispatch = useDispatch();
  const inputEl = useRef();

  const handleImageUpload = () => {
    dispatch(toggleSettingsModal());
    dispatch(toggleEditAvatarModal());
    setUserAvatar(URL.createObjectURL(inputEl.current.files[0]));
  };

  if (editable) {
    return (
      <>
        <ChangeProfileImgModal
          userAvatar={userAvatar}
          setUserAvatar={setUserAvatar}
        />
        <AvatarContainer>
          <ProfileImg publicId={userAvatar} size={size} />
          <EditButton as="label" for="profile_upload" />
          <input
            type="file"
            id="profile_upload"
            name="profile_upload"
            onChange={handleImageUpload}
            ref={inputEl}
            style={{ display: 'none' }}
          ></input>
        </AvatarContainer>
      </>
    );
  }

  return <ProfileImg publicId={userAvatar} />;
};

export default Avatar;
