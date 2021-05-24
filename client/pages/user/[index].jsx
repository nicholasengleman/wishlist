import React from 'react';
import Styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { getSession } from '@auth0/nextjs-auth0';

import { toggleCategoryModal } from 'redux/actions/modals';
import { pageWidth } from 'globalStyles/mixins';
import { initializeApollo } from 'lib/apolloClient';
import GET_USER from 'queries/getUser';

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

const UserPage = (props) => {
  const dispatch = useDispatch();

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

        {/* {Array.isArray(wishData) &&
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
          ))} */}
      </WishContainer>
    </>
  );
};

export async function getServerSideProps({ req, res }) {
  const apolloClient = initializeApollo();

  const session = await getSession(req, res);
  const { user } = session;

  await apolloClient.query({
    query: GET_USER,
    variables: {
      id: user.sub,
    },
  });

  return {
    props: {
      session: user,
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default UserPage;
