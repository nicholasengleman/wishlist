import React from 'react';
import Styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';

import {
  displayCategoryModal,
  displayWishModal,
} from '../../redux/actions/modals.js';
import GET_USER_WISHES from '../../queries/getUserWishes.js';

import { pageWidth } from '../../globalStyles/mixins';
import { FlexContainer } from '../common/Flex/index.jsx';
import { LightButton } from '../common/Button/index.jsx';
import ProfileHeader from './children/ProfileHeader/index.jsx';
import WishModal from './children/modals/Wish/index.jsx';
import CategoryModal from './children/modals/Category/index.jsx';
import EditProfileModal from './children/modals/EditProfile/index.jsx';
import Category from './children/Category/index.jsx';
import Wish from './children/Wish/index.jsx';

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
          onClick={() => dispatch(displayCategoryModal({ mode: 'add' }))}
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
                    dispatch(displayWishModal({ mode: 'add', catIndex }))
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
