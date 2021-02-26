import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

import { FirebaseContext } from '../../../firebase';

import Modal from '../../Modal';
import { toggleSignInModal } from '../../../../redux/actions/modals';
import { Row, Column } from '../../Flex';
import { Input } from '../../Inputs';
import { H1, H3 } from '../../Text';
import ErrorMessage from '../../ErrorMessage';
import { SubmitButton } from '../../Button';

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(8).required(),
});

const SignInModal = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm({
    resolver: joiResolver(schema),
  });

  const emailError = formState?.errors?.email?.message;
  const passwordError = formState?.errors?.password?.message;

  const firebase = useContext(FirebaseContext);

  const onSubmit = ({ email, password }) => {
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((authUser) => {
        dispatch(toggleSignInModal());
      })
      .catch((error) => console.log(error));
  };

  return (
    <Modal modalName="signInModal" onOverlayClick={toggleSignInModal()}>
      <Row justifyContent="center" marginSize={1}>
        <H1>Sign In</H1>
      </Row>
      <Row justifyContent="center" marginSize={2}>
        <H3>Don't have an account?</H3>
      </Row>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Row marginSize={2}>
          <Column>
            <Input
              name="email"
              type="text"
              ref={register}
              placeholder="Email"
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <ErrorMessage message={emailError} />
          </Column>
        </Row>

        <Row marginSize={2} justifyContent="space-between">
          <Column>
            <Input
              name="password"
              type="text"
              ref={register}
              placeholder="Password"
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <ErrorMessage message={passwordError} />
          </Column>
        </Row>

        <Row>
          <Column>
            <SubmitButton type="submit">
              Sign In<i className="fas fa-arrow-right"></i>
            </SubmitButton>
          </Column>
        </Row>
      </form>
    </Modal>
  );
};

export default SignInModal;
