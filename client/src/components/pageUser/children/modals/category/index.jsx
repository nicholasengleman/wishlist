import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

import UPDATE_USER_WISHES from '../../../../../queries/updateUserWishes';
import GET_USER from '../../../../../queries/getUser';
import { toggleCategoryModal } from '../../../../../redux/actions/modals';
import useGetUser from '../../../../../hooks/useGetUser';

import Modal from '../../../../common/Modal';
import DeleteModal from '../../../../common/modalDelete';
import { LightButton } from '../../../../common/Button';
import { Row, Column } from '../../../../common/Flex';
import { Input } from '../../../../common/Inputs';

const ModalEdit = () => {
  const { uid } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [modalStatus, setModalStatus] = useState({});
  const [updateWish] = useMutation(UPDATE_USER_WISHES);
  const { mode, catIndex } = useSelector((state) => state.modals.categoryModal);
  const data = useGetUser('wishData');

  const onSubmit = (category) => {
    let newData = _.cloneDeep(data);
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

    updateWish({
      variables: {
        user_id: uid,
        wishData: JSON.stringify(newData),
      },
      refetchQueries: [{ query: GET_USER, variables: { user_id: uid } }],
    });
    dispatch(toggleCategoryModal());
  };

  const onDelete = () => {
    const newData = _.cloneDeep(data);
    newData.splice(catIndex, 1);

    updateWish({
      variables: {
        user_id: uid,
        wishData: JSON.stringify(newData),
      },
      refetchQueries: [{ query: GET_USER, variables: { user_id: uid } }],
    });

    setModalStatus({ ...modalStatus, modalDelete: false });
    dispatch(toggleCategoryModal());
  };

  const [catData, setCatData] = useState({});

  useEffect(() => {
    if (mode === 'edit') {
      setCatData(data[catIndex]);
    }
  }, [mode, data, catIndex]);

  return (
    <>
      <DeleteModal
        onCancel={() => setModalStatus({ ...modalStatus, modalDelete: false })}
        onConfirm={() => onDelete()}
        status={modalStatus}
      />
      <Modal modalName="categoryModal" onOverlayClick={toggleCategoryModal()}>
        <Row justifyContent="space-between">
          <LightButton
            onClick={() =>
              setModalStatus({ ...modalStatus, modalDelete: true })
            }
          >
            Delete Category
          </LightButton>
        </Row>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Column>
              <label htmlFor="name">Category Name</label>
              <Input
                name="name"
                id="name"
                type="text"
                defaultValue={catData.name}
                ref={register}
              />
            </Column>
          </Row>
          <Row>
            <Input type="submit" />
          </Row>
        </form>
      </Modal>
    </>
  );
};

export default ModalEdit;
