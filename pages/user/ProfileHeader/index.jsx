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
`;

const ProfileInfo = Styled.div`
   width: 300px;
   z-index: 2;
   position: relative;
   .bio {
    position: absolute;
    top: 150px;
    left: 350px;
    width: 200px;
   }
`;

const ProfileHeader = () => {
  const { user } = useUser();
  const { avatarPublicId, name, location, bio, hobbies, twitter, instagram } =
    useGetUser();

  return (
    <HeaderContainer>
      <Cover editable={true} />
      <ProfileInfo>
        <Avatar editable={true} size="2" publicId={avatarPublicId} />
        <div className="bio">
          <H1>{name}</H1>
          <Paragraph>{hobbies}</Paragraph>
          <Paragraph>{location}</Paragraph>
          <Paragraph>{bio}</Paragraph>
          <Paragraph>{twitter}</Paragraph>
          <Paragraph>{instagram}</Paragraph>
        </div>
      </ProfileInfo>
    </HeaderContainer>
  );
};

export default ProfileHeader;
