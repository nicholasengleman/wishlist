import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

import GET_USER_WISHES from '../../../../../queries/getUserWishes';
import UPDATE_USER_WISHES from '../../../../../queries/updateUserWishes';
import { hideCategoryModal } from '../../../../../redux/actions/modals';

import Modal from '../Modal';
import DeleteModal from '../../../../common/modalDelete';
import { CloseButton } from '../../../../common/IconButtons';
import { LightButton } from '../../../../common/Button';
import { Row, Column } from '../../../../common/Flex';
import { Input } from '../../../../common/Inputs';

const ModalEdit = ({ data, userId }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [modalStatus, setModalStatus] = useState({});
  const [updateWish] = useMutation(UPDATE_USER_WISHES);
  const { status, mode, catIndex } = useSelector(
    (state) => state.modals.categoryModal,
  );

  const onSubmit = (category) => {
    let newData = _.cloneDeep(data);
    if (mode === 'add') {
      if (!newData) {
        newData = {
          categories: [
            {
              id: uuidv4(),
              name: category.name,
              wishes: [],
            },
          ],
        };
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
        userId,
        wishData: JSON.stringify(newData),
      },
      refetchQueries: [{ query: GET_USER_WISHES, variables: { userId } }],
    });
    dispatch(hideCategoryModal());
  };

  const onDelete = () => {
    const newData = _.cloneDeep(data);
    newData.splice(catIndex, 1);

    updateWish({
      variables: {
        userId,
        wishData: JSON.stringify(newData),
      },
      refetchQueries: [{ query: GET_USER_WISHES, variables: { userId } }],
    });

    setModalStatus({ ...modalStatus, modalDelete: false });
    dispatch(hideCategoryModal());
  };

  const [catData, setCatData] = useState({});

  useEffect(() => {
    if (mode === 'edit') {
      setCatData(data[catIndex]);
    }
  }, [mode, data, catIndex]);

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
      <Modal overlayClick={() => dispatch(hideCategoryModal())}>
        <Row justifyContent="space-between">
          <CloseButton click={() => dispatch(hideCategoryModal())} />
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
