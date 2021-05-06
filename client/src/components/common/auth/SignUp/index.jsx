import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@apollo/client';
import Joi from 'joi';

import { FirebaseContext } from '../../../firebase';
import INSERT_USER from '../../../../queries/insertUser';

import Modal from '../../Modal';
import { toggleSignUpModal } from '../../../../redux/actions/modals';
import { Row, Column } from '../../Flex';
import { Input, Label } from '../../Inputs';
import { H1, H3 } from '../../Text';
import ErrorMessage from '../../ErrorMessage';
import { SubmitButton } from '../../Button';

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
  username: Joi.string().min(6).required().messages({
    'string.base':
      'Sorry! It looks like something went wrong. Please try later',
    'string.required': 'Please pick a username!',
    'string.empty': 'Please pick a username!',
    'string.min': 'Usernames must be at least 6 characters.',
  }),
  password: Joi.string().min(8).required().messages({
    'string.base':
      'Sorry! It looks like something went wrong. Please try later',
    'string.required': 'Please add a password.',
    'string.empty': 'Please add a password.',
    'string.min': 'Password must be at least 8 characters.',
  }),
  passwordConfirm: Joi.any().equal(Joi.ref('password')).required().messages({
    'string.base':
      'Sorry! It looks like something went wrong. Please try later',
    'any.required': 'Please add a password.',
    'string.empty': 'Please add a password.',
    'any.only': 'Passwords do not match.',
  }),
});

const SignUpModal = () => {
  const [insertUser] = useMutation(INSERT_USER, {
    context: {
      headers: {
        'x-hasura-admin-secret': process.env.REACT_APP_HASURA_ADMIN_SECRET,
      },
    },
  });

  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm({
    resolver: joiResolver(schema),
  });

  const firebase = useContext(FirebaseContext);

  const onSubmit = ({ email, password, username }) => {
    console.log(username);
    firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        insertUser({
          variables: {
            id: authUser.user.uid,
            username,
          },
        });
        dispatch(toggleSignUpModal());
      })
      .catch((error) => console.log(error));
  };

  return (
    <Modal modalName="signUpModal" onOverlayClick={toggleSignUpModal()}>
      <Row justifyContent="center" marginSize={2}>
        <H1>Create an Account</H1>
      </Row>
      <Row justifyContent="center" marginSize={4}>
        <H3>Already have an account? Sign In</H3>
      </Row>

      <form>
        <Row marginSize={2}>
          <Column>
            <Label htmlFor="email">Email</Label>
            <Input name="email" ref={register} />
            <ErrorMessage message={formState?.errors?.email?.message} />
          </Column>
        </Row>

        <Row marginSize={2}>
          <Column>
            <Label htmlFor="username">Username</Label>
            <Input name="username" ref={register} />
            <ErrorMessage message={formState?.errors?.username?.message} />
          </Column>
        </Row>

        <Row marginSize={2}>
          <Column>
            <Label htmlFor="password">Password</Label>
            <Input name="password" type="password" ref={register} />
            <ErrorMessage message={formState?.errors?.password?.message} />
          </Column>
        </Row>
        <Row marginSize={4}>
          <Column>
            <Label htmlFor="passwordConfirm">Confirm Password</Label>
            <Input name="passwordConfirm" type="password" ref={register} />
            <ErrorMessage
              message={formState?.errors?.passwordConfirm?.message}
            />
          </Column>
        </Row>
      </form>
      <Row justifyContent="center">
        <SubmitButton type="submit" onClick={handleSubmit(onSubmit)}>
          Create Account<i className="fas fa-arrow-right"></i>
        </SubmitButton>
      </Row>
    </Modal>
  );
};

export default SignUpModal;
