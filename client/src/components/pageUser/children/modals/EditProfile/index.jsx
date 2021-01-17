import React from 'react';

import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';

import { toggleEditProfileModal } from '../../../../../redux/actions/modals';

import Modal from '../../../../common/Modal';
import { LightButton } from '../../../../common/Button';
import { Row, Column } from '../../../../common/Flex';
import { Input, Textarea } from '../../../../common/Inputs';

const EditProfile = () => {
  return (
    <Modal
      modalName="editProfileModal"
      onOverlayClick={toggleEditProfileModal()}
    ></Modal>
  );
};

export default EditProfile;
