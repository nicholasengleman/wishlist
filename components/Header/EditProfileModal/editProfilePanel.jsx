import React, { useState, useEffect, useRef } from 'react';
import Styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from '@auth0/nextjs-auth0';

import uploadImage from 'pages/api/upload-image';
import EditAvatar from 'pages/user/modals/EditAvatar';
import useGetUser from '/hooks/useGetUser';
import useUpdateUser from '/hooks/useUpdateUser';
import {
  toggleSettingsModal,
  toggleEditAvatarModal,
} from '/redux/actions/modals';

import Cover from 'pages/user/Cover';
import { Row, Column, FlexContainer } from 'components/Flex';
import { Label, Input } from 'components/Inputs';

const StyledDiv = Styled.div`
  display: flex;
  height: 100%;

  .illustration {
    width: 30%;
    border-right: 1px solid lightgrey;
    margin-right: 50px;
  }

  .form {
    overflow: scroll;
  }

`;

const EditProfilePanel = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.modals.settingsModal);
  const { user, error, isLoading } = useUser();

  const { register, handleSubmit } = useForm();
  const userData = useGetUser(user?.sub);
  const [userAvatar, setUserAvatar] = useState(
    'https://www.mantruckandbus.com/fileadmin/media/bilder/02_19/219_05_busbusiness_interviewHeader_1485x1254.jpg',
  );
  const inputEl = useRef();

  const onSubmit = async (data) => {
    useUpdateUser(user?.sub, data);
    const avatarCloudinaryId = await uploadImage(userAvatar);
    useUpdateUser(user?.sub, { avatarImg: avatarCloudinaryId });
    dispatch(toggleSettingsModal());
  };

  const handleImageUpload = () => {
    dispatch(toggleSettingsModal());
    dispatch(toggleEditAvatarModal());
    setUserAvatar(URL.createObjectURL(inputEl.current.files[0]));
  };

  return (
    <StyledDiv>
      <div className="illustration"></div>
      <div className="form">
        <Cover height="200px" editable={true} />
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
                    {...register('username')}
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
                    {...register('name')}
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
                    {...register('location')}
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
                    {...register('bio')}
                  />
                </Column>
              </Row>
            </form>
          </Row>
        </FlexContainer>
      </div>
    </StyledDiv>
  );
};

export default EditProfilePanel;
