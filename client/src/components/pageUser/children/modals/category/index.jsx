import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import UPDATE_USER_WISHES from '../../../../../queries/updateUserWishes';
import GET_USER_WISHES from '../../../../../queries/getUserWishes';
import DeleteModal from '../../../../common/modalDelete';

import '../styles.scss';

const ModalEdit = ({ setModalVisibility, modalVisibility, data, userId }) => {
  const { register, handleSubmit } = useForm();
  const [modalStatus, setModalStatus] = useState({});
  const [updateWish] = useMutation(UPDATE_USER_WISHES);
  const { mode, catIndex } = modalVisibility;

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
    setModalVisibility(false);
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
    setModalVisibility(false);
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
      <div className="modal-overlay" onClick={() => setModalVisibility(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="header">
            <i
              className="far fa-times-circle"
              onClick={() => setModalVisibility(false)}
            />
            <button
              type="button"
              className="btn"
              onClick={() =>
                setModalStatus({ ...modalStatus, modalDelete: true })
              }
            >
              Delete Category
            </button>
          </div>
          <form className="body" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="column">
                <div className="row">
                  <div className="column">
                    <label htmlFor="name">Category Name</label>
                    <input
                      name="name"
                      id="name"
                      className="input"
                      type="text"
                      defaultValue={catData.name}
                      ref={register}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <input className="submit" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ModalEdit;
