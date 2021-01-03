import React from 'react';

import { useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { hideEditProfileModal } from '../../../../../redux/actions/modals';

import Modal from '../Modal';
import { CloseButton } from '../../../../common/IconButtons';
import { LightButton } from '../../../../common/Button';
import { Row, Column } from '../../../../common/Flex';
import { Input, Textarea } from '../../../../common/Inputs';

const EditProfile = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.modals.editProfileModal);

  if (!status) {
    return null;
  }

  return (
    <Modal overlayClick={() => dispatch(hideEditProfileModal())}>
      <Row justifyContent="space-between">
        <CloseButton click={() => dispatch(hideEditProfileModal())} />
      </Row>
    </Modal>
  );
};

export default EditProfile;
