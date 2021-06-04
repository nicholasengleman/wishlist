import React from 'react';
import Styled from 'styled-components';
import { useUser } from '@auth0/nextjs-auth0';

import { pageWidth } from 'globalStyles/mixins';
import device from 'globalStyles/breakpoints';
import { Column } from 'components/Flex';
import { H1, Paragraph } from 'components/Text';
import Avatar from 'components/Avatar';
import useGetUser from 'hooks/useGetUser';
import Cover from 'pages/user/Cover';

const HeaderContainer = Styled.div`
   ${pageWidth};
    position: relative;
    margin-bottom: 150px;
    height: 200px;
`;

const ProfileInfo = Styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 2;

    h1 {
        font-size: 28px;
        font-weight: 600;
        margin: 1rem 0;
    }

    p {
      margin: 0;
      font-size: 18px;
    }
`;

const ProfileHeader = () => {
  const { user, error, isLoading } = useUser();
  const { avatarPublicId, name, location } = useGetUser(user?.sub);

  return (
    <HeaderContainer>
      <Cover />
      <ProfileInfo>
        <Avatar size="2" publicId={avatarPublicId} margin={'-100px 30px 0 30px'}/>
        <Column>
           <h1>{name}</h1>
          <Paragraph>{location}</Paragraph>
        </Column>
      </ProfileInfo>
    </HeaderContainer>
  );
};

export default ProfileHeader;
