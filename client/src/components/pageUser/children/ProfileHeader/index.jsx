import React from 'react';
import Styled from 'styled-components';

import { pageWidth } from '../../../../globalStyles/mixins';
import device from '../../../../globalStyles/breakpoints';
import { Row, Column } from '../../../common/Flex';
import { H1, Paragraph } from '../../../common/Text';
import Avatar from '../../../common/Avatar';
import useGetUser from '../../../../hooks/useGetUser';

const HeaderContainer = Styled.div`
   ${pageWidth};
    position: relative;
    margin-bottom: 2rem;
`;

const ProfileInfo = Styled.div`
    margin: -50px 30px 0 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    @media ${device.tablet} {
        flex-direction: row;
    }

    h1 {
        font-size: 20px;
        font-weight: 600;
    }

`;

const LeftColumn = Styled(Row)`

`;

const RightColumn = Styled(Row)`
    width: 100%;
     @media ${device.tablet} {
        width: 50%;
    }
`;

// const EditProfileBtn = Styled(EditButton)`
//     position: absolute;
//     right: 15px;
//     bottom: 15px;
// `;

const ProfileHeader = () => {
  const avatarUrl = useGetUser('avatar');

  return (
    <HeaderContainer>
      <ProfileInfo>
        <LeftColumn>
          <Avatar size="2" url={avatarUrl} />
          <Column>
            <H1>Nicholas Engleman</H1>
            <Paragraph>Web Developer</Paragraph>
          </Column>
        </LeftColumn>
        <RightColumn></RightColumn>
      </ProfileInfo>
    </HeaderContainer>
  );
};

export default ProfileHeader;
