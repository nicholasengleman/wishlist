import React from 'react';
import Styled from 'styled-components';
import { useSelector } from 'react-redux';

import Avatar from '../Avatar';
import { buttonColor } from '../../../globalStyles/mixins';

const StyledProfileLink = Styled.button`
    ${buttonColor}
    display: flex;
    align-items: center;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 20px;
    padding: 3px 10px 3px 6px;
    margin-right: 10px;
    span {
        margin-left: 5px;
        color: blue;
        font-size: 1rem;
    }
`;

const ProfileLink = () => {
  const username = useSelector((state) => state.user?.general?.username);
  return (
    <StyledProfileLink>
      <Avatar size="0" />
      <span>Hi, {username}</span>
    </StyledProfileLink>
  );
};

export default ProfileLink;
