import React from 'react';
import Styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useUser } from '@auth0/nextjs-auth0';

import { toggleSettingsModal } from '/redux/actions/modals';
import useGetUser from 'hooks/useGetUser';
import updateUser from '/utils/updateUser';
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
    margin-right: 5vw;
    padding-top: 100px;
  }

  .form {
    overflow: scroll;
    padding-top: 100px;
  }

`;

const EditProfileModal = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const userData = useGetUser();
  const { user } = useUser();

  const onSubmit = (data) => {
    updateUser(user?.sub, data);
    dispatch(toggleSettingsModal());
  };

  return (
    <Modal
      modalName="settingsModal"
      onSubmit={handleSubmit(onSubmit)}
      onClose={toggleSettingsModal()}
    >
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
                    <Label htmlFor="username">User Name</Label>
                    <Input
                      name="username"
                      id="username"
                      type="text"
                      defaultValue={userData?.username}
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
                      defaultValue={userData?.name}
                      {...register('name')}
                    />
                  </Column>
                </Row>

                <Row>
                  <Column>
                    <Label htmlFor="name">Hobbies</Label>
                    <Input
                      name="hobbies"
                      id="hobbies"
                      type="text"
                      defaultValue={userData?.hobbies}
                      {...register('hobbies')}
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
                      defaultValue={userData?.location}
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
                      defaultValue={userData?.bio}
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
                        defaultValue={userData?.twitter}
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
