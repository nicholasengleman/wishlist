import React, { useState, useEffect, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import ZoomInput from './StyledZoomInput';

import {
  toggleEditAvatarModal,
  toggleEditProfileModal,
} from '../../../../../redux/actions/modals';
import Modal from '../../../../common/Modal';
import { Row, Column } from '../../../../common/Flex';
import { Label, Input } from '../../../../common/Inputs';
import { SubmitButton } from '../../../../common/Button';

const EditAvatar = ({ userAvatar, setUserAvatar }) => {
  const [zoom, setZoom] = useState(1);
  const dispatch = useDispatch();
  const inputEl = useRef();
  const zoomEl = useRef();

  const onSubmit = () => {
    setUserAvatar(inputEl.current.getImage().toDataURL());
    dispatch(toggleEditAvatarModal());
    dispatch(toggleEditProfileModal());
  };

  const onZoomChange = () => {
    setZoom(zoomEl.current.value);
  };

  return (
    <Modal modalName="editAvatarModal" onOverlayClick={toggleEditAvatarModal()}>
      <Row marginSize={3} justifyContent="center">
        <AvatarEditor
          image={userAvatar}
          width={400}
          height={400}
          border={1}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={Number(zoom)}
          rotate={0}
          borderRadius={500}
          ref={inputEl}
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
          ref={zoomEl}
          onChange={onZoomChange}
        />
      </Row>
      <Row>
        <SubmitButton center={true} onClick={onSubmit}>
          Submit
        </SubmitButton>
      </Row>
    </Modal>
  );
};

export default EditAvatar;
