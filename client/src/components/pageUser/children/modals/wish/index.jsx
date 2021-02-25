import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import UPDATE_USER_WISHES from '../../../../../queries/updateUserWishes';
import GET_USER from '../../../../../queries/getUser';
import { toggleWishModal } from '../../../../../redux/actions/modals';

import Modal from '../../../../common/Modal';
import Image from '../../../../common/Image';
import uploadImage from '../../../../helperFunctions/uploadImage';
import DeleteModal from '../../../../common/modalDelete';
import { LightButton } from '../../../../common/Button';
import { Row, Column } from '../../../../common/Flex';
import { Input, Textarea } from '../../../../common/Inputs';
import useGetUser from '../../../../../hooks/useGetUser';

const WishModal = () => {
  const dispatch = useDispatch();
  const { uid: user_id } = useSelector((state) => state.user);
  const { register, handleSubmit } = useForm();
  const [wishData, setWishData] = useState({});
  const [prefillData, setPrefillData] = useState({});
  const { register: register2, handleSubmit: handleSubmit2 } = useForm();
  const [modalStatus, setModalStatus] = useState({});
  const [updateWish] = useMutation(UPDATE_USER_WISHES);
  const data = useGetUser('wishData');
  const { mode, catIndex, wishIndex } = useSelector(
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
        image: newData[catIndex]?.wishes[wishIndex]?.image || '',
      };
    }

    if (mode === 'edit') {
      newData[catIndex].wishes[wishIndex] = wishWithUpdatedImage;
    }

    if (mode === 'add') {
      newData[catIndex]?.wishes.push(wishWithUpdatedImage);
    }

    updateWish({
      variables: {
        user_id,
        wishData: JSON.stringify(newData),
      },
      awaitRefetchQueries: true,
      refetchQueries: [{ query: GET_USER, variables: { user_id } }],
    });

    dispatch(toggleWishModal());
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
        user_id,
        wishData: JSON.stringify(newData),
      },
      refetchQueries: [{ query: GET_USER, variables: { user_id } }],
    });

    setModalStatus({ ...modalStatus, modalDelete: false });
    dispatch(toggleWishModal());
  };

  useEffect(() => {
    if (mode === 'edit') {
      setWishData(data[catIndex].wishes[wishIndex]);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <DeleteModal
        onCancel={() => setModalStatus({ ...modalStatus, modalDelete: false })}
        onConfirm={() => onDelete()}
        status={modalStatus}
      />
      <Modal modalName="wishModal" onOverlayClick={toggleWishModal()}>
        <Row justifyContent="space-between">
          <LightButton
            onClick={() =>
              setModalStatus({ ...modalStatus, modalDelete: true })
            }
          >
            Delete Wish
          </LightButton>
        </Row>
        <form className="prefill" onSubmit={handleSubmit2(onPrefillSubmit)}>
          <Input
            name="url"
            id="url"
            type="text"
            defaultValue="Enter Product URL to Prefill Info"
            ref={register2}
          />
          <Input type="submit" />
        </form>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Column>
              <Image
                imageUrl={prefillData.image || wishData.image}
                type="product"
              />
            </Column>
            <Column>
              <Row>
                <Column>
                  <label htmlFor="name">Goal Name</label>
                  <Input
                    name="name"
                    id="name"
                    type="text"
                    defaultValue={prefillData.name || wishData.name}
                    ref={register}
                  />
                </Column>
              </Row>
              <Row>
                <Column>
                  <label htmlFor="name">Price</label>
                  <Input
                    name="price"
                    id="price"
                    type="text"
                    defaultValue={prefillData.price || wishData.price}
                    ref={register}
                  />
                </Column>
              </Row>
              <Row>
                <Column>
                  <label htmlFor="name">Store</label>
                  <Input
                    name="store"
                    id="store"
                    type="text"
                    defaultValue={prefillData.store || wishData.store}
                    ref={register}
                  />
                </Column>
              </Row>
              <Row>
                <Column>
                  <label htmlFor="name">Description</label>
                  <Textarea
                    name="description"
                    id="description"
                    className="input"
                    defaultValue={
                      prefillData.description || wishData.description
                    }
                  />
                </Column>
              </Row>
            </Column>
          </Row>
          <Input type="submit" />
        </form>
      </Modal>
    </>
  );
};

export default WishModal;
