import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import ProfileHeader from './children/profileHeader';
import Donors from './children/donors';
import DonationBar from './children/donateBtn';
import WishModal from './children/modals/wish';
import CategoryModal from './children/modals/category';
import Image from '../common/Image';

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
      <ProfileHeader />
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
            <div className="category" key={`${Math.random()}`}>
              <div className="header">
                <div className="header-row">
                  <i
                    className="far fa-edit"
                    onClick={() =>
                      setCatModalVisibility({
                        mode: 'edit',
                        catIndex,
                      })
                    }
                  />
                  <div className="category-name">{category.name}</div>
                </div>
                <div className="header-row">
                  <div className="tags">
                    {/* <div className='tags'>{category.tags.map((tag) => tag)}</div> */}
                  </div>
                </div>
              </div>
              <div className="wishes">
                {category.wishes &&
                  category.wishes.map((wish, wishIndex) => (
                    <div className="wish" key={`${Math.random()}`}>
                      <i
                        className="far fa-edit"
                        onClick={() =>
                          setWishModalVisibility({
                            mode: 'edit',
                            catIndex,
                            wishIndex,
                          })
                        }
                      />
                      <div className="wish-data">
                        <Image imageUrl={wish.image} type="product" />
                        <div className="description">
                          <div className="title row">{wish.name}</div>
                          <div className="priceContainer row">
                            <span className="price">${wish.price}</span>
                            <span className="store">at {wish.store}</span>
                          </div>
                          <div className="why row">{wish.description}</div>
                          <div className="row">
                            <Donors max={5} />
                          </div>
                          <div className="row donations">
                            <div className="progress">
                              <span className="raised">$2.50</span>
                            </div>
                          </div>
                          <div className="row">
                            <DonationBar />
                          </div>
                        </div>
                      </div>
                    </div>
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
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Profile;
