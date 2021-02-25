import React from 'react';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { Row, Column } from './../Flex';
import { CloseButton } from '../IconButtons';
import { SubmitButton } from '../Button';

const ModalOverlay = Styled.div`
   background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledModal = Styled.div`
    width: 30%;
    min-width: 600px;
    max-width: 95%;
    background-color: white;
    padding: 1.5rem 1rem;
    box-sizing: content-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    border-radius: 20px;
`;

const Modal = ({ children, modalName, onOverlayClick, onCall }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.modals[modalName]);

  if (!status) {
    return null;
  }

  return (
    <ModalOverlay>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <Row justifyContent="flex-start">
          <CloseButton click={() => dispatch(onOverlayClick)} />
        </Row>
        <Row marginSize={2}>
          <Column>{children}</Column>
        </Row>
        <Row>
          <Column>
            <SubmitButton center={true} onClick={() => onCall && onCall()}>
              Submit
            </SubmitButton>
          </Column>
        </Row>
      </StyledModal>
    </ModalOverlay>
  );
};

export default Modal;
