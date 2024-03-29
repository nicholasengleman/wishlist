import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { getSession } from '@auth0/nextjs-auth0';

import ChangeAvatarModal from 'pages/user/modals/changeAvatar';
import WishModal from 'pages/user/modals/Wish';
import CategoryModal from 'pages/user/modals/Category';

import { initializeApollo } from 'lib/apolloClient';
import GET_USER from 'queries/getUser';
import useGetUser from 'hooks/useGetUser';
import { FlexContainer, Row, Column } from 'components/Flex';
import ProfileHeader from 'pages/user/ProfileHeader';
import CategoryHeader from 'pages/user/CategoryHeader';
import Wish from 'pages/user/Wish';
import SectionList from 'pages/user/SectionList';

const UserPage = () => {
  const { selectedSection } = useSelector((state) => state.sections);
  const wishData = useGetUser('wishData');

  console.log(wishData);

  return (
    <>
      <WishModal />
      <CategoryModal />
      <ChangeAvatarModal />
      <ProfileHeader />
      <Row container={true} alignItems="flex-start" gap="3rem">
        <SectionList />
        <Column margin="-10px 0 0 0">
          {wishData && wishData?.map((category, catIndex) => {
              if (
                !selectedSection ||
                (selectedSection && selectedSection === category.id)
              ) {
                return (
                  <Fragment key={catIndex}>
                    <CategoryHeader
                      category={category}
                      catId={category.id}
                      key={`${Math.random()}`}
                    />
                    <FlexContainer>
                      {category.wishes &&
                        category.wishes.map((wish) => (
                          <Wish
                            wish={wish}
                            wishId={wish.id}
                            catId={category.id}
                            key={`${Math.random()}`}
                          />
                        ))}
                    </FlexContainer>
                  </Fragment>
                );
              }
            })}
        </Column>
      </Row>
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
