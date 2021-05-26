import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useUser } from '@auth0/nextjs-auth0';

import { toggleWishModal } from 'redux/actions/modals';
import useGetUser from 'hooks/useGetUser';
import useUpdateUser from 'hooks/useUpdateUser';

import Modal from 'components/Modal';
import Image from 'components/Image';
import uploadImage from 'pages/api/uploadImage';
import DeleteModal from 'components/modalDelete';
import { NavButton } from 'components/Buttons/NavButton';
import { Row, Column } from 'components/Flex';
import { Input, Textarea, Form, Label } from 'components/Inputs';
import { SubmitButton } from 'components/Buttons/SubmitButton';

const WishModal = () => {
  const dispatch = useDispatch();
  const { user, error, isLoading } = useUser();
  const { register, handleSubmit } = useForm();
  const [wishData, setWishData] = useState({});
  const [prefillData, setPrefillData] = useState({});
  const { register: register2, handleSubmit: handleSubmit2 } = useForm();
  const [modalStatus, setModalStatus] = useState({});
  const data = useGetUser(user?.sub, 'wishData');
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

    useUpdateUser({ wishData: newData });
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

    useUpdateUser({ wishData: newData });
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
          <NavButton
            small={true}
            onClick={() =>
              setModalStatus({ ...modalStatus, modalDelete: true })
            }
          >
            Delete Wish
          </NavButton>
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

            <NavButton center={true}>Get Info</NavButton>
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
