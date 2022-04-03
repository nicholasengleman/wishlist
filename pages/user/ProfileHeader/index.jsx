import React from 'react';
import Styled from 'styled-components';
import { useUser } from '@auth0/nextjs-auth0';

import { pageWidth } from 'globalStyles/mixins';
import { Column, Row } from 'components/Flex';
import { H1, Paragraph } from 'components/Text';
import Avatar from 'components/Avatar';
import useGetUser from 'hooks/useGetUser';
import Cover from 'pages/user/Cover';

const HeaderContainer = Styled.div`
   ${pageWidth};
    position: relative;
    margin-bottom: 100px;
`;

const ProfileInfo = Styled.div`
   z-index: 2;
   position: relative;
   width: 300px;

   .bio {
    position: absolute;
    top: 150px;
    left: 350px;
    width: 500px;

     i {
      margin-right: 5px;
      }
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
          {bio && (
            <Paragraph color="#667279" marginSize={1}>
              {bio}
            </Paragraph>
          )}
          <Row alignItems="flex-start" gap="3rem">
            <Column width="200px">
              {hobbies && (
                <Paragraph color="#FFADAD">
                  <i aria-hidden className="fa-solid fa-fire"></i>
                  {hobbies}
                </Paragraph>
              )}
              {location && (
                <Paragraph color="#FFADAD">
                  <i aria-hidden className="fa-solid fa-earth-americas"></i>
                  {location}
                </Paragraph>
              )}
            </Column>
            <Column width="200px">
              {twitter && (
                <Paragraph color="#FFADAD">
                  <i aria-hidden className="fa-brands fa-twitter-square"></i>
                  {twitter}
                </Paragraph>
              )}
              {instagram && (
                <Paragraph color="#FFADAD">
                  <i aria-hidden className="fa-brands fa-instagram"></i>
                  {instagram}
                </Paragraph>
              )}
            </Column>
          </Row>
        </div>
      </ProfileInfo>
    </HeaderContainer>
  );
};

export default ProfileHeader;
