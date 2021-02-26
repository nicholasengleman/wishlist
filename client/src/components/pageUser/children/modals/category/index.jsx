import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from '@apollo/client';

import { toggleCategoryModal } from '../../../../../redux/actions/modals';
import useGetUser from '../../../../../hooks/useGetUser';
import updateUser from '../../../../../hooks/updateUser';
import UPDATE_USER from '../../../../../queries/updateUser';

import Modal from '../../../../common/Modal';
import DeleteModal from '../../../../common/modalDelete';
import { LightButton } from '../../../../common/Button';
import { Row } from '../../../../common/Flex';
import { Input, Label } from '../../../../common/Inputs';

const CategoryModal = () => {
  const dispatch = useDispatch();
  const [update] = useMutation(UPDATE_USER);
  const { register, handleSubmit } = useForm();
  const { mode, catIndex } = useSelector((state) => state.modals.categoryModal);
  const [catData, setCatData] = useState(null);
  const userData = useGetUser('wishData');

  useEffect(() => {
    if (mode === 'edit') {
      if (!catData && userData) {
        setCatData(userData);
      }
    }
  }, [mode, catData, userData]);

  const onSubmit = (category) => {
    let newData = _.cloneDeep(catData);

    if (mode === 'add') {
      if (!newData) {
        newData = [
          {
            id: uuidv4(),
            name: category.name,
            wishes: [],
          },
        ];
      } else {
        newData.push({ id: uuidv4(), name: category.name, wishes: [] });
      }
    }

    if (mode === 'edit') {
      newData[catIndex] = {
        ...category,
        id: newData[catIndex].id,
        wishes: newData[catIndex].wishes,
      };
    }

    updateUser(update, 'wishData', newData);
    dispatch(toggleCategoryModal());
  };

  const onDelete = () => {
    const newData = _.cloneDeep(catData);
    newData.splice(catIndex, 1);

    updateUser(update, 'wishData', newData);
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
        onOverlayClick={toggleCategoryModal()}
        onCall={handleSubmit(onSubmit)}
      >
        <Row justifyContent="flex-end">
          <LightButton small={true} onClick={() => onDelete()}>
            Delete
          </LightButton>
        </Row>
        <form>
          <Label htmlFor="name">Category Name</Label>
          <Input
            name="name"
            id="name"
            type="text"
            defaultValue={
              catData && catData[catIndex] && catData[catIndex].name
            }
            ref={register}
          />
        </form>
      </Modal>
    </>
  );
};

export default CategoryModal;
