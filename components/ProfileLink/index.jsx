import React from 'react';
import Link from 'next/link';
import Styled from 'styled-components';
import { useUser } from '@auth0/nextjs-auth0';

import useGetUser from 'hooks/useGetUser';
import { buttonColor } from 'globalStyles/mixins';

import Avatar from 'components/Avatar';

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
  const { user, error, isLoading } = useUser();
  const username = useGetUser(user?.sub, 'username');
  const avatarPublicId = useGetUser(user?.sub, 'avatarImg');

  return (
    <StyledProfileLink>
      <>
        <Avatar size="1" publicId={avatarPublicId} />
        <Link href={`user/${username}`}>{username || ''}</Link>
      </>
    </StyledProfileLink>
  );
};

export default ProfileLink;
