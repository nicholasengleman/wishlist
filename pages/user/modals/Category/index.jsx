import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@auth0/nextjs-auth0';

import { toggleCategoryModal } from 'redux/actions/modals';
import useGetUser from 'hooks/useGetUser';
import updateUser from 'utils/updateUser';

import Modal from 'components/Modal';
import { Row } from 'components/Flex';
import { Input, Label } from 'components/Inputs';

const CategoryModal = () => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const { register, handleSubmit, reset } = useForm();
  const { mode, catId } = useSelector((state) => state.modals.categoryModal);
  const [catData, setCatData] = useState(null);
  const [catIndex, setCatIndex] = useState(null);
  const userData = useGetUser('wishData');

  useEffect(() => {
    if (mode === 'edit') {
      setCatData(userData);
    }
  }, [mode, catData, userData]);

  useEffect(() => {
    setCatIndex(userData.findIndex((el) => el.id === catId));
  }, [userData, catId]);

  const onSubmit = ({ category }) => {
    let newData = _.cloneDeep(userData);

    if (mode === 'add') {
      if (!newData) {
        newData = [
          {
            id: uuidv4(),
            name: category,
            wishes: [],
          },
        ];
      } else {
        newData.push({ id: uuidv4(), name: category, wishes: [] });
      }
    }

    if (mode === 'edit') {
      newData[catIndex] = {
        name: category,
        id: newData[catIndex].id,
        wishes: newData[catIndex].wishes,
      };
    }

    updateUser(user?.sub, { wishData: newData });
  };

  const handleDelete = () => {
    const newData = _.cloneDeep(catData);
    newData.splice(catIndex, 1);
    updateUser(user?.sub, { wishData: newData });
  };

  return (
    <>
      <Modal
        modalName="categoryModal"
        onSubmit={handleSubmit(onSubmit)}
        onDelete={() => handleDelete()}
        onClose={toggleCategoryModal()}
        onCloseCb={() => reset()}
      >
        <Row marginSize={4} justifyContent="center">
          <form>
            <Label htmlFor="name">Category Name</Label>
            <Input
              name="name"
              id="name"
              type="text"
              defaultValue={catData && catData[catIndex]?.name}
              {...register('category')}
            />
          </form>
        </Row>
      </Modal>
    </>
  );
};

export default CategoryModal;
