import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useUser } from '@auth0/nextjs-auth0';

import useGetUser from 'hooks/useGetUser';
import updateUser from 'utils/updateUser';
import { toggleWishModal } from 'redux/actions/modals';

import Modal from 'components/Modal';
import { Row, Column } from 'components/Flex';
import { Input, Textarea, Form, Label } from 'components/Inputs';
import { SubmitButton } from 'components/Buttons/SubmitButton';
import CloudinaryImage from 'components/CloudinaryImage';

const WishModal = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, setValue } = useForm();
  const { register: register2, handleSubmit: handleSubmit2 } = useForm();
  const [modalStatus, setModalStatus] = useState({});
  const [tempImage, setTempImage] = useState('');
  const [permImage, setPermImage] = useState('');

  const allData = useGetUser('wishData');
  const { mode, catId, wishId } = useSelector(
    (state) => state.modals.wishModal,
  );

  // Sets the form value of editing a wish
  useEffect(() => {
    if (mode === 'edit') {
      allData.filter((category, i) => {
        if (category.id === catId) {
          allData[i].wishes.forEach((wish, e) => {
            if (wish.id === wishId) {
              setPermImage(allData[i].wishes[e].image);
              setValue('name', allData[i].wishes[e].name);
              setValue('price', allData[i].wishes[e].price);
              setValue('store', allData[i].wishes[e].store);
              setValue('description', allData[i].wishes[e].description);
            }
          });
        }
      });
    }
  }, [allData, mode, catId, wishId]);

  const onSubmit = async (newWish) => {
    const newAllData = _.cloneDeep(allData);
    let newImage = '';

    // Add Image
    if (tempImage) {
      const image = await axios.post('/api/image-upload', {
        data: tempImage,
      });
      newImage = image.data.public_id;
    }

    if (mode === 'edit') {
      newAllData.forEach((category, c) => {
        if (category.id === catId) {
          if (
            newAllData[c].wishes.forEach((wish, w) => {
              if (wish.id === wishId) {
                newAllData[c].wishes[w] = {
                  id: wish.id,
                  image: wish.image || newImage,
                  ...newWish,
                };
              }
            })
          );
        }
      });
    }

    if (mode === 'add') {
      newAllData.forEach((category) => {
        if (category.id === catId) {
          category?.wishes.push({
            id: uuidv4(),
            ...newWish,
          });
        }
      });
    }

    updateUser(user?.sub, { wishData: newAllData });
  };

  // Gets form value from open graph tags
  const onPrefillSubmit = ({ url }) => {
    axios
      .post(`/api/get-open-graph-tags/`, { data: url })
      .then((response) => {
        if (response.data) {
          setPermImage('');
          setTempImage(response.data.hybridGraph.image);
          setValue('name', response.data.hybridGraph.title);
          setValue('price', 5);
          setValue('store', response.data.hybridGraph.site_name);
          setValue('description', response.data.hybridGraph.description);
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

  const getImage = () => {
    if (permImage) {
      return <CloudinaryImage id={permImage} />;
    }
    if (tempImage) {
      return <img src={tempImage} />;
    }
    return <img src={'https://via.placeholder.com/300'} />;
  };

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
              <Column style={{ width: '30%' }}>{getImage()}</Column>
              <Column style={{ width: '60%' }}>
                <Row>
                  <Column>
                    <Label htmlFor="name">Goal Name</Label>
                    <Input
                      name="name"
                      id="name"
                      type="text"
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
                      {...register('description')}
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
