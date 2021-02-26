import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';

import { toggleEditProfileModal } from '../../../../../redux/actions/modals';
import Modal from '../../../../common/Modal';
import { Row } from '../../../../common/Flex';
import { Label, Input } from '../../../../common/Inputs';

import UPDATE_USER from '../../../../../queries/updateUser';
import useGetUser from '../../../../../hooks/useGetUser';
import updateUser from '../../../../../hooks/updateUser';

const EditProfile = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.modals.editProfileModal);
  const { register, handleSubmit } = useForm();
  const [update] = useMutation(UPDATE_USER);
  const user = useGetUser('username');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(user);
  }, [user, status]);

  console.log('render');

  const onSubmit = ({ username }) => {
    updateUser(update, 'username', username);
    dispatch(toggleEditProfileModal());
  };

  return (
    <Modal
      modalName="editProfileModal"
      onOverlayClick={toggleEditProfileModal()}
      onCall={handleSubmit(onSubmit)}
    >
      <form>
        <Label htmlFor="name">User Name</Label>
        <Input
          name="username"
          id="username"
          type="text"
          defaultValue={userData}
          ref={register}
        />
      </form>
    </Modal>
  );
};

export default EditProfile;
