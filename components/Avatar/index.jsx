import React, { useRef, useState } from 'react';
import Styled from 'styled-components';
import { useDispatch } from 'react-redux';

import useGetUser from 'hooks/useGetUser';
import { EditButton } from 'components/IconButtons';

import ProfileImg from './children/ProfileImg';
import { toggleEditAvatarModal } from '/redux/actions/modals';

const AvatarContainer = Styled.div`
  width: 225px;
  position: relative;
  margin: -130px 0 20px 100px;

    button {
      top: 50%;
      right: -20px;
      position: absolute;
   }
`;

const Avatar = ({ size, editable }) => {
  const dispatch = useDispatch();
  const avatarImgId = useGetUser('avatarImg');

  if (editable) {
    return (
      <>
        <AvatarContainer>
          <ProfileImg publicId={avatarImgId} size={size} />
          <EditButton onClick={() => dispatch(toggleEditAvatarModal())} />
        </AvatarContainer>
      </>
    );
  }

  return <ProfileImg publicId={avatarImgId} />;
};

export default Avatar;
