import React, { useState, useRef, useEffect } from 'react';
import AvatarEditor from 'react-avatar-editor';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useUser } from '@auth0/nextjs-auth0';

import { toggleEditAvatarModal } from 'redux/actions/modals';

import ZoomInput from './StyledZoomInput';
import imageUpdate from 'utils/updateImage';
import useGetUser from 'hooks/useGetUser';
import Modal from 'components/Modal';
import { Row } from 'components/Flex';
import { UploadPhotoButton } from 'components/IconButtons';

const EditAvatar = () => {
  const { user } = useUser();
  const [zoom, setZoom] = useState(5);
  const [avatar, setAvatar] = useState();
  const dispatch = useDispatch();
  const uploadImageEl = useRef();
  const avatarEl = useRef();
  const zoomEl = useRef();
  const { avatarOriginal, avatarImg } = useGetUser();

  useEffect(async () => {
    if (avatarOriginal) {
      const data = await axios.post('/api/image-info', {
        data: avatarOriginal,
      });
      if (data.status === 200) {
        setAvatar(data?.data?.result?.url);
      } else {
        console.log('Could not load avatar in change avatar modal.');
      }
    }
  }, [avatarOriginal]);

  const onSubmit = async () => {
    const image = avatarEl.current.getImage();
    imageUpdate(user?.sub, image, 'avatarImg', avatarImg);
  };

  const handleUploadNewImage = async () => {
    const file = uploadImageEl.current.files[0];
    setAvatar(URL.createObjectURL(file));
    imageUpdate(user?.sub, file, avatarOriginal, 'avatarOriginal');
    setZoom(1);
  };

  const onZoomChange = () => {
    setZoom(zoomEl.current.value);
  };

  return (
    <Modal
      modalName="editAvatarModal"
      onSubmit={onSubmit}
      onClose={toggleEditAvatarModal()}
    >
      <UploadPhotoButton as="label" htmlFor="profile_upload" rect={true} />
      <input
        type="file"
        id="profile_upload"
        name="profile_upload"
        onChange={handleUploadNewImage}
        ref={uploadImageEl}
        style={{ display: 'none' }}
      ></input>
      <Row marginSize={3} justifyContent="center">
        <AvatarEditor
          image={avatar}
          width={400}
          height={400}
          border={1}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={Number(zoom)}
          rotate={0}
          ref={avatarEl}
          crossOrigin="anonymous"
          borderRadius={500}
        />
      </Row>
      <Row justifyContent="center">
        <ZoomInput
          type="range"
          id="zoom"
          name="zoom"
          min="1"
          max="10"
          step="0.1"
          value={zoom}
          ref={zoomEl}
          onChange={onZoomChange}
        />
      </Row>
    </Modal>
  );
};

export default EditAvatar;
