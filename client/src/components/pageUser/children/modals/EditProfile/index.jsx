import React, { useState, useEffect, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';

import EditAvatar from '../EditAvatar';
import {
  toggleEditProfileModal,
  toggleEditAvatarModal,
} from '../../../../../redux/actions/modals';
import Modal from '../../../../common/Modal';
import { Row, Column } from '../../../../common/Flex';
import { Label, Input } from '../../../../common/Inputs';
import { SubmitButton } from '../../../../common/Button';

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
  const [userAvatar, setUserAvatar] = useState(
    'https://www.mantruckandbus.com/fileadmin/media/bilder/02_19/219_05_busbusiness_interviewHeader_1485x1254.jpg',
  );
  const inputEl = useRef();

  useEffect(() => {
    setUserData(user);
  }, [user, status]);

  const onSubmit = ({ username }) => {
    updateUser(update, 'username', username);
    dispatch(toggleEditProfileModal());
  };

  const handleImageUpload = () => {
    dispatch(toggleEditProfileModal());
    dispatch(toggleEditAvatarModal());
    setUserAvatar(URL.createObjectURL(inputEl.current.files[0]));
  };

  return (
    <>
      <EditAvatar userAvatar={userAvatar} setUserAvatar={setUserAvatar} />
      <Modal
        modalName="editProfileModal"
        onOverlayClick={toggleEditProfileModal()}
      >
        <Row>
          <img
            style={{ width: '300px', borderRadius: '200px' }}
            src={userAvatar}
            alt="Profile"
          />
        </Row>
        <Row>
          <input
            type="file"
            id="profile_upload"
            name="profile_upload"
            onChange={handleImageUpload}
            ref={inputEl}
          ></input>
        </Row>
        <Row>
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

export default EditProfile;
