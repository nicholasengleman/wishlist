import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { FirebaseContext } from '../../../firebase';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

import Modal from '../../Modal';
import { toggleResetPasswordModal } from '../../../../redux/actions/modals';
import { Row, Column } from '../../Flex';
import { H3 } from '../../Text';
import { Input } from '../../Inputs';
import { SubmitButton } from '../../Button';
import ErrorMessage from '../../ErrorMessage';

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.base':
        'Sorry! It looks like something went wrong. Please try later',
      'string.empty': 'Please add a valid email.',
      'string.email': 'This email is not valid.',
    }),
});

const ResetPasswordModal = () => {
  const dispatch = useDispatch();
  const firebase = useContext(FirebaseContext);
  const { register, handleSubmit, formState } = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmit = ({ email }) => {
    console.log('clicked');
    firebase
      .doPasswordReset(email)
      .then((e) => console.log(e))
      .catch((error) => console.log(error));
  };

  return (
    <Modal
      modalName="resetPasswordModal"
      onOverlayClick={toggleResetPasswordModal()}
    >
      <Row justifyContent="center" marginSize={4}>
        <H3>Need to reset your password?</H3>
      </Row>

      <form>
        <Row>
          <Column>
            <Input
              name="email"
              type="text"
              ref={register}
              placeholder="Email"
            />
          </Column>
        </Row>
        <Row marginSize={3}>
          <Column>
            <ErrorMessage message={formState?.errors?.email?.message} />
          </Column>
        </Row>
      </form>

      <Row justifyContent="center">
        <SubmitButton type="submit" onClick={handleSubmit(onSubmit)}>
          Send verification email <i className="fas fa-arrow-right"></i>
        </SubmitButton>
      </Row>
    </Modal>
  );
};

export default ResetPasswordModal;
