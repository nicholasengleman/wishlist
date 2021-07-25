import React from 'react';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Column } from 'components/Flex';
import { SubmitButton } from 'components/Buttons/SubmitButton';
import { CancelButton } from 'components/Buttons/CancelButton';

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
    width: 100%;
    height: 100%;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    border-radius: 0;
    overflow: hidden;
    position: relative;
`;

const StyledContent = Styled.div`
  padding: 50px;
  height: calc(100% - 70px);
`;

const StyledFooter = Styled.footer`
  background: ${(props) => props.theme.modalFooterBg};
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  padding: 15px 30px;
  height: 70px;
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
        <StyledContent>{children}</StyledContent>
        <StyledFooter>
          <CancelButton small={true} onClick={() => handleClose()}>
            Cancel
          </CancelButton>
          <SubmitButton>Save</SubmitButton>
        </StyledFooter>
      </StyledModal>
    </ModalOverlay>
  );
};

export default Modal;
