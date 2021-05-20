import React from 'react';
import Styled from 'styled-components';
import { useDispatch } from 'react-redux';
import getUser from 'hooks/useGetUser';

import { toggleCategoryModal } from 'redux/actions/modals';

import { pageWidth } from 'globalStyles/mixins';

import { FlexContainer, Row } from 'components/Flex';
import { EditButton } from 'components/Button';

import ProfileHeader from 'pages/user/ProfileHeader';
import WishModal from 'pages/user/modals/Wish';
import CategoryModal from 'pages/user/modals/Category';
import CategoryHeader from 'pages/user/CategoryHeader';
import Wish from 'pages/user/Wish';

const WishContainer = Styled(FlexContainer)`
  display: flex;
  flex-direction: column;
  ${pageWidth};
`;

const Profile = () => {
  const dispatch = useDispatch();
  const wishData = getUser('wishData');

  return (
    <>
      <WishModal />
      <CategoryModal />
      <ProfileHeader />
      <WishContainer>
        <Row>
          <EditButton
            onClick={() => dispatch(toggleCategoryModal({ mode: 'add' }))}
          >
            Add Category
          </EditButton>
        </Row>

        {Array.isArray(wishData) &&
          wishData.map((category, catIndex) => (
            <>
              <CategoryHeader
                category={category}
                catIndex={catIndex}
                key={`${Math.random()}`}
              />
              <FlexContainer>
                {category.wishes &&
                  category.wishes.map((wish, wishIndex) => (
                    <Wish
                      wish={wish}
                      wishIndex={wishIndex}
                      catIndex={catIndex}
                      key={`${Math.random()}`}
                    />
                  ))}
              </FlexContainer>
            </>
          ))}
      </WishContainer>
    </>
  );
};

export default Profile;
