import React from 'react';

import { toggleEditProfileModal } from '../../../../../redux/actions/modals';

import Modal from '../../../../common/Modal';

const EditProfile = () => {
  return (
    <Modal
      modalName="editProfileModal"
      onOverlayClick={toggleEditProfileModal()}
    ></Modal>
  );
};

export default EditProfile;
