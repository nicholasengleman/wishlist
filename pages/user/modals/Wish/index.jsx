import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useUser } from '@auth0/nextjs-auth0';

import useGetUser from 'hooks/useGetUser';
import { toggleWishModal } from 'redux/actions/modals';
import updateUser from 'utils/updateUser';
import Modal from 'components/Modal';
import { Row, Column } from 'components/Flex';
import { Input, Textarea, Form, Label } from 'components/Inputs';
import { SubmitButton } from 'components/Buttons/SubmitButton';

const WishModal = () => {
  const { user } = useUser();
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();
  const { register: register2, handleSubmit: handleSubmit2 } = useForm();

  const [wishData, setWishData] = useState({});
  const [prefillData, setPrefillData] = useState({});
  const [modalStatus, setModalStatus] = useState({});
  const [catIndex, setCatIndex] = useState(null);

  const data = useGetUser('wishData');
  const { mode, catId, wishIndex } = useSelector(
    (state) => state.modals.wishModal,
  );

  useEffect(() => {
    setCatIndex(data.findIndex((el) => el.id === catId));
  }, [data, catId]);

  const onSubmit = async (updatedWish) => {
    const newData = _.cloneDeep(data);
    let wishWithUpdatedImage = {};

    // A new image is uploaded
    if (prefillData.image) {
      const image = await axios.post('/api/image-upload', {
        data: prefillData.image,
      });
      wishWithUpdatedImage = {
        ...updatedWish,
        image: image.data.public_id,
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

    updateUser(user?.sub, { wishData: newData });
  };

  const onPrefillSubmit = ({ url }) => {
    axios
      .post(`/api/get-open-graph-tags/`, { data: url })
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

    updateUser(user?.sub, { wishData: newData });
    setModalStatus({ ...modalStatus, modalDelete: false });
    dispatch(toggleWishModal());
  };

  useEffect(() => {
    if (mode === 'edit') {
      setWishData(data[catIndex].wishes[wishIndex]);
    }
  }, []);

  return (
    <>
      <Modal
        modalName="wishModal"
        onSubmit={handleSubmit(onSubmit)}
        onClose={toggleWishModal()}
        onCloseCb={() => reset()}
        onDelete={() => setModalStatus({ ...modalStatus, modalDelete: true })}
      >
        <Row marginSize={4}>
          <Form className="prefill" onSubmit={handleSubmit2(onPrefillSubmit)}>
            <Row>
              <Input
                name="url"
                id="url"
                type="text"
                placeholder="Enter Product URL to Prefill Info"
                {...register2('url')}
              />
            </Row>

            <SubmitButton center={true}>Get Info</SubmitButton>
          </Form>
        </Row>

        <Row marginSize={4}>
          <form style={{ width: '100%' }}>
            <Row style={{ gap: '4rem' }}>
              <img
                style={{ maxWidth: '30%' }}
                src={
                  prefillData.image ||
                  wishData.image ||
                  'https://via.placeholder.com/300'
                }
              />
              <Column style={{ width: '60%' }}>
                <Row>
                  <Column>
                    <Label htmlFor="name">Goal Name</Label>
                    <Input
                      name="name"
                      id="name"
                      type="text"
                      defaultValue={prefillData.name || wishData.name || ''}
                      {...register('name')}
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
                      {...register('price')}
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
                      {...register('store')}
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
      </Modal>
    </>
  );
};

export default WishModal;
