import React from 'react';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { Row } from './../Flex';
import { CloseButton } from '../IconButtons';

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
 width: 50vw;
    background-color: white;
    padding: 20px;
    box-sizing: content-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    border-radius: 20px;
`;

const Modal = ({ children, modalName, onOverlayClick }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.modals[modalName]);

  if (!status) {
    return null;
  }

  return (
    <ModalOverlay onClick={() => dispatch(onOverlayClick)}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <Row justifyContent="flex-start">
          <CloseButton click={() => dispatch(onOverlayClick)} />
        </Row>
        {children}
      </StyledModal>
    </ModalOverlay>
  );
};

export default Modal;
