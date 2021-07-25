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
`;

const ProfileHeader = () => {
  const { user, error, isLoading } = useUser();
  const { avatarPublicId, name, location } = useGetUser(user?.sub);

  return (
    <HeaderContainer>
      <Cover editable={true} />
      <ProfileInfo>
        <Avatar
          size="2"
          publicId={avatarPublicId}
          margin={'-100px 30px 0 30px'}
        />
      </ProfileInfo>
    </HeaderContainer>
  );
};

export default ProfileHeader;
