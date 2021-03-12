import React from 'react';
import Styled from 'styled-components';

import { pageWidth } from '../../../../globalStyles/mixins';
import device from '../../../../globalStyles/breakpoints';
import { Row, Column } from '../../../common/Flex';
import { H1, Paragraph } from '../../../common/Text';
import Avatar from '../../../common/Avatar';
import useGetUser from '../../../../hooks/useGetUser';
import Cover from '../Cover';

const HeaderContainer = Styled.div`
   ${pageWidth};
    position: relative;
    margin-bottom: 2rem;
    width: 100%;
`;

const ProfileInfo = Styled.div`
    margin: 30px 30px 0 0;
    width: 300px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    z-index: 2;
    position: relative;
    @media ${device.tablet} {
        flex-direction: row;
    }

    h1 {
        font-size: 20px;
        font-weight: 600;
    }

`;

const ProfileHeader = () => {
  const avatarPublicId = useGetUser('avatarImg');

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
