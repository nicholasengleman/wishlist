import React from 'react';
import { Link } from 'react-router-dom';
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
    a {
        margin-left: 5px;
        color: ${(props) => props.theme.headerText};
        font-size: 1rem;
        font-weight: 600;
    }
    &:hover {
      a {
        color: #2f2f2f;
      }
    }
`;

const ProfileLink = () => {
  const { uid } = useSelector((state) => state.user);

  return (
    <StyledProfileLink>
      <Avatar size="0" />
      <Link to={`user/${uid}`}>My Profile</Link>
    </StyledProfileLink>
  );
};

export default ProfileLink;
