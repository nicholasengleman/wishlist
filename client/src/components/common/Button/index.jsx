import React from 'react';
import { useSelector } from 'react-redux';
import Styled from 'styled-components';
import { darken } from 'polished';

export const Base = Styled.button`
  height: 45px;
  font-size: 1rem;
  border: none;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.1s;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: ${({ padding }) => padding || '18px'};
  border-radius: ${({ borderRadius }) => borderRadius || '12px'};
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
 i {
   position: absolute;
   right: 30px;
 }
  &:hover {
    background-color: ${darken(0.1, '#0183FF')};
  }
`;

const StyledEditButton = Styled(Base)`
 background-color: #ff0000;
 color: yellow;
  &:hover {
    background-color: ${darken(0.1, '#ff0000')};
  }
`;

export const EditButton = ({ children, onClick }) => {
  const { uid } = useSelector((state) => state.user.auth);

  if (!uid) {
    return null;
  }

  return <StyledEditButton onClick={onClick}>{children}</StyledEditButton>;
};
