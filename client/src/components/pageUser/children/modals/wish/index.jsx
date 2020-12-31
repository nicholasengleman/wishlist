import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import UPDATE_USER_WISHES from '../../../../../queries/updateUserWishes';
import GET_USER_WISHES from '../../../../../queries/getUserWishes';
import { hideWishModal } from '../../../../../redux/actions/modals';
import DeleteModal from '../../../../common/modalDelete';
import Image from '../../../../common/Image';
import uploadImage from '../../../../helperFunctions/uploadImage';
import '../styles.scss';
import './styles.scss';

const WishModal = ({ data, userId }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [wishData, setWishData] = useState({});
  const [prefillData, setPrefillData] = useState({});
  const { register: register2, handleSubmit: handleSubmit2 } = useForm();
  const [modalStatus, setModalStatus] = useState({});
  const [updateWish] = useMutation(UPDATE_USER_WISHES);
  const { status, mode, catIndex, wishIndex } = useSelector(
    (state) => state.modals.wishModal,
  );

  const onSubmit = async (updatedWish) => {
    const newData = _.cloneDeep(data);
    let wishWithUpdatedImage = {};

    // A new image is uploaded
    if (prefillData.image) {
      const image = await uploadImage(prefillData.image);
      wishWithUpdatedImage = {
        ...updatedWish,
        image: `https://wishlistengleman.s3.amazonaws.com/${image}`,
      };
    }

    // No new image is uploaded, use current image
    if (!prefillData.image) {
      wishWithUpdatedImage = {
        ...updatedWish,
        image: newData[catIndex].wishes[wishIndex].image,
      };
    }

    if (mode === 'edit') {
      newData[catIndex].wishes[wishIndex] = wishWithUpdatedImage;
    }

    if (mode === 'add') {
      newData[catIndex].wishes.push(wishWithUpdatedImage);
    }

    updateWish({
      variables: {
        userId,
        wishData: JSON.stringify(newData),
      },
      awaitRefetchQueries: true,
      refetchQueries: [{ query: GET_USER_WISHES, variables: { userId } }],
    });

    dispatch(hideWishModal());
  };

  const onPrefillSubmit = ({ url }) => {
    axios
      .get(`http://localhost:3001/opengraph/product?url=${url}`)
      .then((response) => {
        if (response.data) {
          const prefileData = {
            description: response.data.hybridGraph.description,
            name: response.data.hybridGraph.title,
            price: 5,
            store: response.data.hybridGraph.site_name,
            image: response.data.hybridGraph.image,
          };
          setPrefillData(prefileData);
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const onDelete = () => {
    const newData = _.cloneDeep(data);
    newData[catIndex].wishes.splice(wishIndex, 1);

    updateWish({
      variables: {
        userId,
        wishData: JSON.stringify(newData),
      },
      refetchQueries: [{ query: GET_USER_WISHES, variables: { userId } }],
    });

    setModalStatus({ ...modalStatus, modalDelete: false });
    dispatch(hideWishModal());
  };

  useEffect(() => {
    if (mode === 'edit') {
      setWishData(data[catIndex].wishes[wishIndex]);
    }
  }, [mode, data, catIndex, wishIndex]);

  if (!status) {
    return null;
  }

  return (
    <>
      <DeleteModal
        onCancel={() => setModalStatus({ ...modalStatus, modalDelete: false })}
        onConfirm={() => onDelete()}
        status={modalStatus}
      />
      <div className="modal-overlay" onClick={() => dispatch(hideWishModal())}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="header">
            <i
              className="far fa-times-circle"
              onClick={() => dispatch(hideWishModal())}
            />
            <button
              className="btn"
              type="button"
              onClick={() =>
                setModalStatus({ ...modalStatus, modalDelete: true })
              }
            >
              Delete Wish
            </button>
          </div>
          <form className="prefill" onSubmit={handleSubmit2(onPrefillSubmit)}>
            <input
              name="url"
              id="url"
              className="input"
              type="text"
              defaultValue="Enter Product URL to Prefill Info"
              ref={register2}
            />
            <input className="submit" type="submit" />
          </form>
          <form className="body" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="column column-photo">
                <Image
                  imageUrl={prefillData.image || wishData.image}
                  type="product"
                />
              </div>
              <div className="column">
                <div className="row">
                  <div className="column">
                    <label htmlFor="name">Goal Name</label>
                    <input
                      name="name"
                      id="name"
                      className="input"
                      type="text"
                      defaultValue={prefillData.name || wishData.name}
                      ref={register}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="column">
                    <label htmlFor="price">Price</label>
                    <input
                      name="price"
                      id="price"
                      className="input"
                      type="text"
                      defaultValue={prefillData.price || wishData.price}
                      ref={register}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="column">
                    <label htmlFor="store">Store</label>
                    <input
                      name="store"
                      id="store"
                      className="input"
                      type="text"
                      defaultValue={prefillData.store || wishData.store}
                      ref={register}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="column">
                    <label htmlFor="description">Description</label>
                    <textarea
                      name="description"
                      id="description"
                      className="input"
                      defaultValue={
                        prefillData.description || wishData.description
                      }
                      ref={register}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <input className="submit" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default WishModal;
