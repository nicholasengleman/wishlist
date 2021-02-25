import React from 'react';
import Styled from 'styled-components';
import { useDispatch } from 'react-redux';
import getUser from '../../hooks/useGetUser';

import {
  toggleCategoryModal,
  toggleWishModal,
} from '../../redux/actions/modals';

import { pageWidth } from '../../globalStyles/mixins';
import { FlexContainer, Row } from '../common/Flex';
import { EditButton } from '../common/Button';
import ProfileHeader from './children/ProfileHeader';
import WishModal from './children/modals/Wish';
import CategoryModal from './children/modals/Category';
import EditProfileModal from './children/modals/EditProfile';
import Category from './children/Category';
import Wish from './children/Wish';

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
      <EditProfileModal />
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
            <Category
              category={category}
              catIndex={catIndex}
              key={`${Math.random()}`}
            >
              <FlexContainer marginSize={2}>
                {category.wishes &&
                  category.wishes.map((wish, wishIndex) => (
                    <Wish
                      wish={wish}
                      wishIndex={wishIndex}
                      catIndex={catIndex}
                      key={`${Math.random()}`}
                    />
                  ))}
                <EditButton
                  onClick={() =>
                    dispatch(
                      toggleWishModal({
                        mode: 'add',
                        catIndex,
                        wishIndex: category.wishes.length,
                      }),
                    )
                  }
                >
                  Add Wish
                </EditButton>
              </FlexContainer>
            </Category>
          ))}
      </WishContainer>
    </>
  );
};

export default Profile;
