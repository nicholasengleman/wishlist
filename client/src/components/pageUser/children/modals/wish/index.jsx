import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import UPDATE_USER from '../../../../../queries/updateUser';
import { toggleWishModal } from '../../../../../redux/actions/modals';

import Modal from '../../../../common/Modal';
import Image from '../../../../common/Image';
import uploadImage from '../../../../utils/uploadImage';
import DeleteModal from '../../../../common/modalDelete';
import { LightButton } from '../../../../common/Button';
import { Row, Column } from '../../../../common/Flex';
import { Input, Textarea, Form, Label } from '../../../../common/Inputs';
import useGetUser from '../../../../../hooks/useGetUser';
import updateUser from '../../../../../hooks/updateUser';
import { SubmitButton } from '../../../../common/Button';

const WishModal = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [wishData, setWishData] = useState({});
  const [prefillData, setPrefillData] = useState({});
  const { register: register2, handleSubmit: handleSubmit2 } = useForm();
  const [modalStatus, setModalStatus] = useState({});
  const [update] = useMutation(UPDATE_USER);
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

    updateUser(update, 'wishData', newData);
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

    updateUser(update, 'wishData', newData);
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
      {/* <DeleteModal
        onCancel={() => setModalStatus({ ...modalStatus, modalDelete: false })}
        onConfirm={() => onDelete()}
        status={modalStatus}
      /> */}
      <Modal
        modalName="wishModal"
        onOverlayClick={toggleWishModal()}
        onCall={handleSubmit(onSubmit)}
      >
        <Row justifyContent="flex-end" marginSize={4}>
          <LightButton
            small={true}
            onClick={() =>
              setModalStatus({ ...modalStatus, modalDelete: true })
            }
          >
            Delete Wish
          </LightButton>
        </Row>

        <Row marginSize={4}>
          <Form className="prefill" onSubmit={handleSubmit2(onPrefillSubmit)}>
            <Row>
              <Input
                name="url"
                id="url"
                type="text"
                placeholder="Enter Product URL to Prefill Info"
                ref={register2}
              />
            </Row>

            <LightButton center={true}>Get Info</LightButton>
          </Form>
        </Row>

        <Row marginSize={4}>
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
                    <Label htmlFor="name">Goal Name</Label>
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
                    <Label htmlFor="name">Price</Label>
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
                    <Label htmlFor="name">Store</Label>
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
                    <Label htmlFor="name">Description</Label>
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
          </form>
        </Row>
        <Row>
          <SubmitButton center={true} onClick={handleSubmit(onSubmit)}>
            Submit
          </SubmitButton>
        </Row>
      </Modal>
    </>
  );
};

export default WishModal;
