import React from 'react';
import Styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

import {
  toggleCategoryModal,
  toggleWishModal,
} from '../../redux/actions/modals';
import GET_USER_WISHES from '../../queries/getUser';

import { pageWidth } from '../../globalStyles/mixins';
import { FlexContainer } from '../common/Flex';
import { EditButton } from '../common/Button';
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
  const { uid: userId } = useSelector((state) => state.user.auth);
  console.log(userId);

  const { loading, data } = useQuery(GET_USER_WISHES, {
    variables: { user_id: userId },
  });

  if (loading || !data) {
    return <h1>loading...</h1>;
  }

  const wishData =
    data?.users_by_pk?.wishData && JSON.parse(data?.users_by_pk?.wishData);

  return (
    <>
      <WishModal data={wishData} userId={userId} />
      <CategoryModal data={wishData} userId={userId} />
      <EditProfileModal userId={userId} />
      <ProfileHeader />
      <WishContainer>
        <EditButton
          onClick={() => dispatch(toggleCategoryModal({ mode: 'add' }))}
        >
          Add Category
        </EditButton>
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
                <EditButton
                  onClick={() =>
                    dispatch(toggleWishModal({ mode: 'add', catIndex }))
                  }
                ></EditButton>
              </FlexContainer>
            </Category>
          ))}
      </WishContainer>
    </>
  );
};

export default Profile;
