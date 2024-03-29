import React from 'react';
import Styled, { keyframes, createGlobalStyle } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitButton } from 'components/Buttons/SubmitButton';
import { CancelButton } from 'components/Buttons/CancelButton';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }`;

const GlobalStyle = createGlobalStyle`
  body {
    position: ${(props) => (props.modalOpen ? 'fixed' : 'static')};
  }`;

const ModalOverlay = Styled.div`
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
    width: 80%;
    height: 80%;
    background-color: white;
    box-shadow: 0 4px 50px 10px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    animation: ${fadeIn} 0.1s ease-out;
`;

const StyledContent = Styled.div`
  padding: 50px;
  height: calc(100% - 70px);
`;

const StyledFooter = Styled.footer`
  background: ${(props) => props.theme.modalFooterBg};
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px 30px;
  height: 70px;
`;

const Modal = ({
  children,
  modalName,
  onClose,
  onSubmit,
  onCloseCb,
  onDelete,
}) => {
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

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    }
    handleClose();
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
    handleClose();
  };

  return (
    <>
      <GlobalStyle modalOpen={status} />
      <ModalOverlay onClick={() => handleClose()}>
        {/* <DeleteModal
        onCancel={() => setModalStatus({ ...modalStatus, modalDelete: false })}
        onConfirm={() => onDelete()}
        status={modalStatus}
      /> */}
        <StyledModal onClick={(e) => e.stopPropagation()}>
          <StyledContent>{children}</StyledContent>
          <StyledFooter>
            <div>
              {onDelete && (
                <CancelButton small={true} onClick={() => handleDelete()}>
                  Delete
                </CancelButton>
              )}
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <CancelButton small={true} onClick={() => handleClose()}>
                Cancel
              </CancelButton>
              <SubmitButton onClick={() => handleSubmit()}>Save</SubmitButton>
            </div>
          </StyledFooter>
        </StyledModal>
      </ModalOverlay>
    </>
  );
};

export default Modal;
