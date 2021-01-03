import React from 'react';
import Styled from 'styled-components';

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
    padding: 40px;
    box-sizing: content-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    border-radius: 20px;
`;

const Modal = ({ children, overlayClick }) => (
  <ModalOverlay onClick={overlayClick}>
    <StyledModal onClick={(e) => e.stopPropagation()}>{children}</StyledModal>
  </ModalOverlay>
);

export default Modal;
