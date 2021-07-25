import React, { useState } from 'react';
import Styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from '@auth0/nextjs-auth0';

import { toggleSettingsModal } from '/redux/actions/modals';

import uploadImage from 'pages/api/upload-image';
import useGetUser from '/hooks/useGetUser';
import useUpdateUser from '/hooks/useUpdateUser';

import Modal from 'components/Modal';
import { Row, Column, FlexContainer } from 'components/Flex';
import { Label, Input, Textarea } from 'components/Inputs';
import image1 from 'resources/images/undraw-portfolio.svg';

const StyledDiv = Styled.div`
  display: flex;
  height: 100%;

  .illustration {
    width: 33%;
    min-width: 33%;
    border-right: 1px solid lightgrey;
    margin-right: 200px;
    padding-top: 100px;
  }

  .form {
    overflow: scroll;
    padding-top: 100px;
  }

`;

const EditProfileModal = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.modals.settingsModal);
  const { user, error, isLoading } = useUser();

  const { register, handleSubmit } = useForm();
  const userData = useGetUser(user?.sub);
  const [userAvatar, setUserAvatar] = useState(
    'https://www.mantruckandbus.com/fileadmin/media/bilder/02_19/219_05_busbusiness_interviewHeader_1485x1254.jpg',
  );

  const onSubmit = async (data) => {
    useUpdateUser(user?.sub, data);
    const avatarCloudinaryId = await uploadImage(userAvatar);
    useUpdateUser(user?.sub, { avatarImg: avatarCloudinaryId });
    dispatch(toggleSettingsModal());
  };

  console.log(image1);

  return (
    <Modal modalName="settingsModal" onClose={toggleSettingsModal()}>
      <StyledDiv>
        <div className="illustration">
          <img src={image1.src} alt="" />
        </div>
        <div className="form">
          <form style={{ width: '100%' }}>
            <FlexContainer gap="50px">
              <FlexContainer width="35%">
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
                    <Label htmlFor="name">Passion</Label>
                    <Input
                      name="passion"
                      id="passion"
                      type="text"
                      defaultValue={userData.location}
                      {...register('passion')}
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
                    <Textarea
                      name="bio"
                      id="bio"
                      type="textarea"
                      rows="2"
                      defaultValue={userData.bio}
                      {...register('bio')}
                    />
                  </Column>
                </Row>
              </FlexContainer>
              <FlexContainer width="35%">
                <Column>
                  <Row>
                    <Column>
                      <Label htmlFor="name">Instagram</Label>
                      <Input
                        name="instagram"
                        id="instagram"
                        type="text"
                        defaultValue={userData?.instagram}
                        {...register('instagram')}
                      />
                    </Column>
                  </Row>

                  <Row>
                    <Column>
                      <Label htmlFor="name">Twitter</Label>
                      <Input
                        name="twitter"
                        id="twitter"
                        type="text"
                        defaultValue={userData.twitter}
                        {...register('twitter')}
                      />
                    </Column>
                  </Row>
                </Column>
              </FlexContainer>
            </FlexContainer>
          </form>
        </div>
      </StyledDiv>
    </Modal>
  );
};

export default EditProfileModal;
