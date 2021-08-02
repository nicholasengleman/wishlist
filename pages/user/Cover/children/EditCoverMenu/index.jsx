import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useUser } from '@auth0/nextjs-auth0';

import { toggleEditCoverMenu } from 'redux/actions/menus';
import useUpdateUser from 'hooks/useUpdateUser';

import Menu from 'components/Menu';
import { SubmitButton } from 'components/Buttons/SubmitButton';
import { UploadButton } from 'components/Buttons/UploadButton';
import { Row } from 'components/Flex';
import { Description } from 'components/Text';
import { Input } from 'components/Inputs';

const Header = Styled.ul`
    width: 400px;
    margin: 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid lightblue;
    li {
      padding: 5px;
      margin: 10px 10px 0 10px;
      font-size: 0.85rem;
      font-weight: 600;
      &:hover {
        background-color: #F7F7F5;
      }
    }
    .mode:nth-child(1) {
      border-bottom: ${({ mode }) => (mode === 1 ? '2px solid black' : '')};
    }
    .mode:nth-child(2) {
      border-bottom: ${({ mode }) => (mode === 2 ? '2px solid black' : '')};
    }
    .mode:nth-child(3) {
      border-bottom: ${({ mode }) => (mode === 3 ? '2px solid black' : '')};
    }
`;

const Body = Styled.div`
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const EditCoverMenu = (props) => {
  const { register, handleSubmit, formState } = useForm();
  const { user, error, isLoading } = useUser();

  const dispatch = useDispatch();
  const [uploadMode, setUploadMode] = useState(1);

  const handleImageUpload = async ({ image }) => {
    const avatarCloudinaryId = await axios.post('/api/upload-image', {
      data: image,
    });
    console.log(avatarCloudinaryId);
    useUpdateUser(user?.sub, { coverImg: avatarCloudinaryId.data.public_id });
    setUploadMode(1);
    dispatch(toggleEditCoverMenu());
  };

  const handleRemoveCover = () => {
    useUpdateUser(user?.sub, { coverImg: '' });
    setUploadMode(1);
    dispatch(toggleEditCoverMenu());
  };

  return (
    <Menu {...props} menuName="editCoverMenu" onClose={toggleEditCoverMenu()}>
      <Header mode={uploadMode}>
        <Row marginSize="0">
          <li className="mode" onClick={() => setUploadMode(1)}>
            Upload
          </li>
          <li className="mode" onClick={() => setUploadMode(2)}>
            Link
          </li>
          {/* <li className="mode" onClick={() => setUploadMode(3)}>
            Unsplash
          </li> */}
        </Row>
        <li onClick={handleRemoveCover}>Remove</li>
      </Header>
      <Body>
        {uploadMode === 1 && (
          <>
            <Row justifyContent="center">
              <UploadButton small={true} onFileChange={handleImageUpload} />
            </Row>
            <Description>Images wider than 1500px work best.</Description>
          </>
        )}
        {uploadMode === 2 && (
          <>
            <form style={{ width: '100%' }}>
              <Row>
                <Input name="image" type="text" {...register('image')} />
              </Row>
              <Row justifyContent="center">
                <SubmitButton
                  type="submit"
                  small={true}
                  onClick={handleSubmit(handleImageUpload)}
                >
                  Submit
                </SubmitButton>
              </Row>
            </form>
            <Description>Works with any image from the web.</Description>
          </>
        )}
      </Body>
    </Menu>
  );
};

export default EditCoverMenu;
