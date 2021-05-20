import React from 'react';
import Link from 'next/link';
import Styled from 'styled-components';
import { useSelector } from 'react-redux';
import Avatar from 'components/Avatar';
import { buttonColor } from 'globalStyles/mixins';
import useGetUser from 'hooks/useGetUser';

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
  const username = useGetUser('username');
  const avatarPublicId = useGetUser('avatarImg');

  return (
    <StyledProfileLink>
      <Avatar size="0" publicId={avatarPublicId} />
      <Link href={`user/${uid}`}>{username}</Link>
    </StyledProfileLink>
  );
};

export default ProfileLink;
