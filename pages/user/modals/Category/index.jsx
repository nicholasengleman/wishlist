import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@auth0/nextjs-auth0';

import { toggleCategoryModal } from 'redux/actions/modals';
import useGetUser from 'hooks/useGetUser';
import useUpdateUser from 'hooks/useUpdateUser';

import Modal from 'components/Modal';
import DeleteModal from 'components/modalDelete';
import { NavButton } from 'components/Buttons/NavButton';
import { Row } from 'components/Flex';
import { Input, Label } from 'components/Inputs';
import { SubmitButton } from 'components/Buttons/SubmitButton';

const CategoryModal = () => {
  const dispatch = useDispatch();
  const { user, error, isLoading } = useUser();
  const { register, handleSubmit, reset } = useForm();
  const { mode, catIndex } = useSelector((state) => state.modals.categoryModal);
  const [catData, setCatData] = useState(null);
  const userData = useGetUser(user?.sub, 'wishData');

  useEffect(() => {
    if (mode === 'edit') {
      if (!catData && userData) {
        setCatData(userData);
      }
    }
  }, [mode, catData, userData]);

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

    useUpdateUser(user?.sub, { wishData: newData });
    dispatch(toggleCategoryModal());
  };

  const onDelete = () => {
    const newData = _.cloneDeep(catData);
    newData.splice(catIndex, 1);

    useUpdateUser(user?.sub, { wishData: newData });
    // setModalStatus({ ...modalStatus, modalDelete: false });
    dispatch(toggleCategoryModal());
  };

  return (
    <>
      {/* <DeleteModal
        onCancel={() => setModalStatus({ ...modalStatus, modalDelete: false })}
        onConfirm={() => onDelete()}
        status={modalStatus}
      /> */}
      <Modal
        modalName="categoryModal"
        onClose={toggleCategoryModal()}
        onCloseCb={() => reset()}
      >
        <Row justifyContent="flex-end" marginSize={3}>
          {catData && (
            <NavButton small={true} onClick={() => onDelete()}>
              Delete
            </NavButton>
          )}
        </Row>
        <Row marginSize={4} justifyContent="center">
          <form>
            <Label htmlFor="name">Category Name</Label>
            <Input
              name="name"
              id="name"
              type="text"
              defaultValue={
                catData && catData[catIndex] && catData[catIndex].name
              }
              {...register('category')}
            />
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

export default CategoryModal;
