import React, { Fragment } from 'react';
import Styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { getSession, useUser } from '@auth0/nextjs-auth0';

import { toggleCategoryModal } from 'redux/actions/modals';
import { pageWidth } from 'globalStyles/mixins';
import { initializeApollo } from 'lib/apolloClient';
import GET_USER from 'queries/getUser';
import useGetUser from 'hooks/useGetUser';

import { FlexContainer, Row } from 'components/Flex';
import { EditButton } from 'components/Buttons/EditButton';

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

const UserPage = () => {
  const { user, error, isLoading } = useUser();
  const dispatch = useDispatch();
  const wishData = useGetUser(user.sub, 'wishData');

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
            <Fragment key={catIndex}>
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
            </Fragment>
          ))}
      </WishContainer>
    </>
  );
};

export async function getServerSideProps({ req, res }) {
  const apolloClient = initializeApollo();
  const session = await getSession(req, res);

  await apolloClient.query({
    query: GET_USER,
    variables: {
      id: session?.user?.sub || '',
    },
  });

  return {
    props: {
      session: { ...session },
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default UserPage;
