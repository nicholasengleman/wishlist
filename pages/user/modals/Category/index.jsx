import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Styled from 'styled-components';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@auth0/nextjs-auth0';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

import { toggleCategoryModal } from 'redux/actions/modals';
import useGetUser from 'hooks/useGetUser';
import updateUser from 'utils/updateUser';

import Modal from 'components/Modal';
import { Input, Label } from 'components/Inputs';
import image1 from 'resources/images/undraw-portfolio.svg';

const StyledDiv = Styled.div`
  display: flex;
  height: 100%;

  .illustration {
    width: 33%;
    min-width: 33%;
    border-right: 1px solid lightgrey;
    margin-right: 5vw;
    padding-top: 100px;
  }

  form {
    overflow: scroll;
    padding-top: 100px;
  }
`;

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
    setCatIndex(userData?.findIndex((el) => el.id === catId));
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
        <StyledDiv>
          <div className="illustration">
            <img src={image1.src} alt="" />
          </div>
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
        </StyledDiv>
      </Modal>
    </>
  );
};

export default CategoryModal;
