import React from 'react';
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
  position: relative;
  padding: ${({ small }) => (small === true ? '0.5rem 1rem' : '0.5rem 2rem')};
  width: fit-content;
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

const StyledEditButton = Styled(Base)`
 background-color: #2ACA9A;
 color: white;
  &:hover {
    background-color: ${darken(0.1, '#2ACA9A')};
  }
`;

export const EditButton = ({ children, onClick }) => {
  const { uid } = useSelector((state) => state.user);

  if (!uid) {
    return null;
  }

  return <StyledEditButton onClick={onClick}>{children}</StyledEditButton>;
};
