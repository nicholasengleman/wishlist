import React from 'react';
import Styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';

import {
  toggleCategoryModal,
  toggleWishModal,
} from '../../redux/actions/modals';
import GET_USER_WISHES from '../../queries/getUserWishes';

import { pageWidth } from '../../globalStyles/mixins';
import { FlexContainer } from '../common/Flex';
import { LightButton } from '../common/Button';
import ProfileHeader from './children/ProfileHeader';
import WishModal from './children/modals/Wish';
import CategoryModal from './children/modals/Category';
import EditProfileModal from './children/modals/EditProfile';
import Category from './children/Category';
import Wish from './children/Wish';

const WishContainer = Styled(FlexContainer)`
  ${pageWidth};
`;

const Profile = (props) => {
  const dispatch = useDispatch();
  const userId = props?.match?.params?.userId;

  const { loading, data } = useQuery(GET_USER_WISHES, {
    variables: { userId },
  });

  if (loading || !data) {
    return <h1>loading...</h1>;
  }

  const wishData = JSON.parse(data.users_by_pk.wishData);

  return (
    <>
      <WishModal data={wishData} userId={userId} />
      <CategoryModal data={wishData} userId={userId} />
      <EditProfileModal userId={userId} />
      <ProfileHeader />
      <WishContainer>
        <LightButton
          onClick={() => dispatch(toggleCategoryModal({ mode: 'add' }))}
        >
          Add Category
        </LightButton>
        {Array.isArray(wishData) &&
          wishData.map((category, catIndex) => (
            <Category
              category={category}
              cateIndex={catIndex}
              key={`${Math.random()}`}
            >
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
                <LightButton
                  onClick={() =>
                    dispatch(toggleWishModal({ mode: 'add', catIndex }))
                  }
                >
                  Add Wish
                </LightButton>
              </FlexContainer>
            </Category>
          ))}
      </WishContainer>
    </>
  );
};

export default Profile;
