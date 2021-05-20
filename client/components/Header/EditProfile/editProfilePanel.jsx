import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import uploadImage from 'pages/api/uploadImage';
import EditAvatar from 'pages/user/modals/EditAvatar';

import {
  toggleSettingsModal,
  toggleEditAvatarModal,
} from '../../../redux/actions/modals';
import { Row, Column, FlexContainer } from '../../Flex';
import { Label, Input } from '../../Inputs';
import { SubmitButton } from '../../Button';

import useGetUser from '../../../hooks/useGetUser';
import updateUser from '../../../hooks/updateUser';

const EditProfilePanel = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.modals.settingsModal);
  const { register, handleSubmit } = useForm();
  const user = useGetUser();
  const [userData, setUserData] = useState({});
  const [userAvatar, setUserAvatar] = useState(
    'https://www.mantruckandbus.com/fileadmin/media/bilder/02_19/219_05_busbusiness_interviewHeader_1485x1254.jpg',
  );
  const inputEl = useRef();

  useEffect(() => {
    setUserData(user);
  }, [user, status]);

  const onSubmit = async (data) => {
    updateUser(data);
    const avatarCloudinaryId = await uploadImage(userAvatar);
    updateUser({ avatarImg: avatarCloudinaryId });
    dispatch(toggleSettingsModal());
  };

  const handleImageUpload = () => {
    dispatch(toggleSettingsModal());
    dispatch(toggleEditAvatarModal());
    setUserAvatar(URL.createObjectURL(inputEl.current.files[0]));
  };

  return (
    <>
      <EditAvatar userAvatar={userAvatar} setUserAvatar={setUserAvatar} />
      <FlexContainer>
        <Row>
          <img
            style={{
              width: '100px',
              borderRadius: '100%',
              marginRight: '20px',
            }}
            src={userAvatar}
            alt="Profile"
          />
          <input
            type="file"
            id="profile_upload"
            name="profile_upload"
            onChange={handleImageUpload}
            ref={inputEl}
          ></input>
        </Row>
        <Row>
          <form style={{ width: '100%' }}>
            <Row>
              <Column>
                <Label htmlFor="name">User Name</Label>
                <Input
                  name="username"
                  id="username"
                  type="text"
                  defaultValue={userData.username}
                  ref={register}
                />
              </Column>
            </Row>
            <Row>
              <Column>
                <Label htmlFor="name">Name</Label>
                <Input
                  name="name"
                  id="name"
                  type="text"
                  defaultValue={userData.name}
                  ref={register}
                />
              </Column>
            </Row>

            <Row>
              <Column>
                <Label htmlFor="name">Location</Label>
                <Input
                  name="location"
                  id="location"
                  type="text"
                  defaultValue={userData.location}
                  ref={register}
                />
              </Column>
            </Row>

            <Row>
              <Column>
                <Label htmlFor="name">Bio</Label>
                <Input
                  name="bio"
                  id="bio"
                  type="textarea"
                  defaultValue={userData.bio}
                  ref={register}
                />
              </Column>
            </Row>
          </form>
        </Row>
        <Row>
          <SubmitButton center={true} onClick={handleSubmit(onSubmit)}>
            Submit
          </SubmitButton>
        </Row>
      </FlexContainer>
    </>
  );
};

export default EditProfilePanel;
