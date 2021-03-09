import React, { useState } from 'react';
import Styled from 'styled-components';
import Menu from '../../../../common/Menu';
import { UploadFileButton } from '../../../../common/Button';
import uploadImageBase64 from '../../../../utils/uploadImage';

const Header = Styled.ul`
    margin: 0;
    display: flex;
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
    li:nth-child(1) {
      border-bottom: ${({ mode }) => (mode === 1 ? '2px solid black' : '')};
    }
    li:nth-child(2) {
      border-bottom: ${({ mode }) => (mode === 2 ? '2px solid black' : '')};
    }
    li:nth-child(3) {
      border-bottom: ${({ mode }) => (mode === 3 ? '2px solid black' : '')};
    }

`;

const Body = Styled.div`
  margin: 1rem;
`;

const EditCoverMenu = (props) => {
  const [uploadMode, setUploadMode] = useState(1);

  const onImageUpload = async (image) => {
    console.log(image);
    const avatarCloudinaryId = await uploadImageBase64(image);
    console.log(avatarCloudinaryId);
  };

  return (
    <Menu {...props} menuName="editCoverMenu">
      <Header mode={uploadMode}>
        <li onClick={() => setUploadMode(1)}>Upload</li>
        <li onClick={() => setUploadMode(2)}>Link</li>
        <li onClick={() => setUploadMode(3)}>Unsplash</li>
      </Header>
      <Body>
        <UploadFileButton onFileChange={onImageUpload} />
      </Body>
    </Menu>
  );
};

export default EditCoverMenu;
