import React from 'react';
import Styled from 'styled-components';
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

const ProfileLink = () => (
  <StyledProfileLink>
    <Avatar size="0" />
    <span>Hi, Nicholas</span>
  </StyledProfileLink>
);

export default ProfileLink;
