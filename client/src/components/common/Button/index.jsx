import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Styled from 'styled-components';
import { darken } from 'polished';

export const Base = Styled.button`
  font-size: ${({ small }) => (small === true ? '0.75rem' : '1rem')};
  border: none;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  position: ${({ position }) => position || 'relative'};
  left: ${({ left }) => left || ''};
  right: ${({ right }) => right || ''};
  top: ${({ top }) => top || ''};
  bottom: ${({ bottom }) => bottom || ''};
  padding: ${({ small }) => (small === true ? '0.5rem 1rem' : '0.5rem 2rem')};
  width: max-content;
  border-radius: ${({ borderRadius }) => borderRadius || '10px'};
  margin-left: ${({ center }) => (center ? 'auto' : '')};
  margin-right: ${({ center }) => (center ? 'auto' : '')};
`;

export const LightButton = Styled(Base)`
 background-color:  rgb(239, 239, 239);
  &:hover {
    background-color: ${darken(0.1, 'rgb(239, 239, 239)')};
  }
`;

export const SubmitButton = Styled(Base)`
 background-color: #0183FF;
 color: white;
 padding:
 i {
   position: absolute;
   right: 30px;
 }
  &:hover {
    background-color: ${darken(0.1, '#0183FF')};
  }
`;

export const StyledEditButton = Styled(Base)`
 background-color: #2ACA9A;
 color: white;
  &:hover {
    background-color: ${darken(0.1, '#2ACA9A')};
  }
`;

export const EditButton = (props) => {
  const { uid } = useSelector((state) => state.user);

  if (!uid) {
    return null;
  }

  return (
    <StyledEditButton {...props} onClick={props.onClick}>
      {props.children}
    </StyledEditButton>
  );
};

export const UploadFileButton = ({ onFileChange }) => {
  const inputEl = useRef();
  const fileUploadAction = () => inputEl.current.click();

  const convertToBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      onFileChange(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  return (
    <div>
      <input
        type="file"
        hidden
        ref={inputEl}
        onChange={() => convertToBase64(inputEl.current.files[0])}
      />
      <SubmitButton onClick={fileUploadAction}>Choose An Image</SubmitButton>
    </div>
  );
};
