import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

import { FirebaseContext } from '../../../firebase';
import { toggleSettingsModal } from '../../../../redux/actions/modals';
import { Row, Column, FlexContainer } from '../../Flex';
import ErrorMessage from '../../ErrorMessage';
import { Label, Input } from '../../Inputs';
import { SubmitButton } from '../../Button';

const schema = Joi.object({
  password: Joi.string().min(8).required().messages({
    'string.base':
      'Sorry! It looks like something went wrong. Please try later',
    'string.required': 'Please add a password.',
    'string.empty': 'Please add a password.',
    'string.min': 'Password must be at least 8 characters.',
  }),
  password_repeat: Joi.string().required().equal(Joi.ref('password')).messages({
    'string.base':
      'Sorry! It looks like something went wrong. Please try later',
    'any.required': 'Please add a password.',
    'string.empty': 'Please add a password.',
    'any.only': 'Passwords do not match.',
  }),
});

const EditPasswordPanel = () => {
  const [submitError, setSubmitError] = useState('');
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm({
    resolver: joiResolver(schema),
  });

  const firebase = useContext(FirebaseContext);

  const onSubmit = async ({ password }) => {
    firebase
      .doPasswordUpdate(password)
      .then(() => dispatch(toggleSettingsModal()))
      .catch((error) => {
        if (error.code === 'auth/requires-recent-login') {
          setSubmitError(
            `1. Password not changed.
             2. This operation requires a recent login.
             3. Please log in again and try again.`,
          );
        }
        console.log(error);
      });
  };

  return (
    <>
      <FlexContainer>
        <form style={{ width: '100%' }}>
          <Row>
            <Column>
              <Label htmlFor="name">New Password</Label>
              <Input name="password" ref={register} />
              <ErrorMessage message={formState?.errors?.password?.message} />
            </Column>
          </Row>
          <Row>
            <Column>
              <Label htmlFor="name">Confirm Password</Label>
              <Input name="password_repeat" ref={register} />
              <ErrorMessage
                message={formState?.errors?.password_repeat?.message}
              />
            </Column>
          </Row>
        </form>

        <Row>
          {!submitError && (
            <SubmitButton center={true} onClick={handleSubmit(onSubmit)}>
              Submit
            </SubmitButton>
          )}
          <ErrorMessage message={submitError} />
        </Row>
      </FlexContainer>
    </>
  );
};

export default EditPasswordPanel;
