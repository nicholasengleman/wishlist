import React, { useEffect, useCallback } from 'react';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { Row, Column } from 'components/Flex';
import { CloseButton } from 'components/IconButtons';

const ModalHeader = Styled(Row)`
  box-shadow: 0 8px 6px -6px black;
  padding: 13px 20px;
  box-sizing: border-box;
  margin: 0;
  position: relative;
  z-index: 1;
`;

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
    min-width: 700px;
    max-width: 95%;
    background-color: white;
    box-sizing: content-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    border-radius: 20px;
`;

const Modal = ({ children, modalName, onClose, onCloseCb }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.modals[modalName]);

  if (!status) {
    return null;
  }

  const handleClose = () => {
    if (onClose) {
      dispatch(onClose);
    }
    if (onCloseCb) {
      onCloseCb();
    }
  };

  return (
    <ModalOverlay onClick={() => handleClose()}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <Row marginSize={1}>
          <Column>{children}</Column>
        </Row>
      </StyledModal>
    </ModalOverlay>
  );
};

export default Modal;
