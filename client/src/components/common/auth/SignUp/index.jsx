import React from 'react';
import Modal from '../../Modal';
import { toggleSignUpModal } from '../../../../redux/actions/modals';

const SignUpModal = () => {
  return (
    <Modal modalName="signUpModal" onOverlayClick={toggleSignUpModal()}></Modal>
  );
};

export default SignUpModal;
