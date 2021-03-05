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
import { Input } from '../../Inputs';
import { H1, H3 } from '../../Text';
import ErrorMessage from '../../ErrorMessage';
import { SubmitButton } from '../../Button';

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  username: Joi.string().min(4).required(),
  password: Joi.string().min(8).required(),
  passwordConfirm: Joi.any().equal(Joi.ref('password')).required(),
});

const SignUpModal = () => {
  const [insertUser] = useMutation(INSERT_USER);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm({
    resolver: joiResolver(schema),
  });

  const emailError = formState?.errors?.email?.message;
  const passwordError = formState?.errors?.password?.message;
  const passwordConfirmError = formState?.errors?.passwordConfirm?.message;

  const firebase = useContext(FirebaseContext);

  const onSubmit = ({ email, password, username }) => {
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <Row marginSize={2}>
          <Column>
            <Input
              name="email"
              type="email"
              ref={register}
              placeholder="Email"
            />
          </Column>
          <Column>
            <Input
              name="username"
              type="text"
              ref={register}
              placeholder="username"
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <ErrorMessage message={emailError} />
          </Column>
        </Row>

        <Row marginSize={4} justifyContent="space-between">
          <Column>
            <Input
              name="password"
              type="text"
              ref={register}
              placeholder="Password"
            />
          </Column>
          <Column>
            <Input
              name="passwordConfirm"
              type="text"
              ref={register}
              placeholder="Password Confirm"
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <ErrorMessage message={passwordError} />
            <ErrorMessage message={passwordConfirmError} />
          </Column>
        </Row>

        <Row justifyContent="center">
          <SubmitButton type="submit">
            Create Account<i className="fas fa-arrow-right"></i>
          </SubmitButton>
        </Row>
      </form>
    </Modal>
  );
};

export default SignUpModal;
