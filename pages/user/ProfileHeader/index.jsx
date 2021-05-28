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
    margin-bottom: 2rem;
    height: 250px;
`;

const ProfileInfo = Styled.div`
    margin: 30px 30px 0 0;
    width: 300px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    z-index: 2;
    position: absolute;
    top: 0;
    left: 70px;
    @media ${device.tablet} {
        flex-direction: row;
    }

    h1 {
        font-size: 20px;
        font-weight: 600;
    }

`;

const ProfileHeader = () => {
  const { user, error, isLoading } = useUser();
  const avatarPublicId = useGetUser(user?.sub, 'avatarImg');

  return (
    <HeaderContainer>
      <Cover />
      <ProfileInfo>
        <Avatar size="2" publicId={avatarPublicId} />
        <Column>
          <H1>Nicholas Engleman</H1>
          <Paragraph>Web Developer</Paragraph>
        </Column>
      </ProfileInfo>
    </HeaderContainer>
  );
};

export default ProfileHeader;
