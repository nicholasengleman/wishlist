import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import WishModal from './children/modals/wish';
import CategoryModal from './children/modals/category';
import Category from './children/category';
import { FlexContainer } from '../common/Flex';
import Wish from './children/Wish';

import GET_USER_WISHES from '../../queries/getUserWishes';
import './styles.scss';

const Profile = (props) => {
  const [wishModalVisibility, setWishModalVisibility] = useState(null);
  const [catModalVisibility, setCatModalVisibility] = useState(null);
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
      {wishModalVisibility && (
        <WishModal
          setModalVisibility={setWishModalVisibility}
          modalVisibility={wishModalVisibility}
          data={wishData}
          userId={userId}
        />
      )}
      {catModalVisibility && (
        <CategoryModal
          setModalVisibility={setCatModalVisibility}
          modalVisibility={catModalVisibility}
          data={wishData}
          userId={userId}
        />
      )}
      <div className="wishesContainer">
        <button
          className="btn btn-addCategory"
          type="button"
          onClick={() => setCatModalVisibility({ mode: 'add' })}
        >
          Add Category
        </button>
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
                      key={`${Math.random()}`}
                    />
                  ))}
                <button
                  className="btn"
                  type="button"
                  onClick={() =>
                    setWishModalVisibility({ mode: 'add', catIndex })
                  }
                >
                  Add Wish
                </button>
              </FlexContainer>
            </Category>
          ))}
      </div>
    </>
  );
};

export default Profile;
