import React from 'react';
import Styled from 'styled-components';
import Link from 'next/link';

const Icon = Styled.button`
  background-color: ${(props) => props.theme.buttonBgLight};
  transition: all 0.2s ease-in-out;
  height: 40px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  outline: transparent;
  position: relative;
  margin: ${({ rect }) => (rect ? '20px auto' : ' 0 10px 0 0')};
  width: ${({ rect }) => (rect ? '400px' : '40px')};
  border-radius: ${({ rect }) => (rect ? '10px' : '50%')};
  i {
    font-size: 16px;
  }
`;

export const AlarmButton = () => (
  <Icon>
    <i aria-hidden className="far fa-bell" />
  </Icon>
);

export const MenuButton = () => (
  <Icon>
    <i aria-hidden className="fas fa-angle-down" />
  </Icon>
);

export const CloseButton = ({ click }) => (
  <Icon>
    <i aria-hidden className="far fa-times-circle" onClick={click} />
  </Icon>
);

export const HomeButton = () => (
  <Link href="/">
    <Icon>
      <i aria-hidden className="fas fa-home"></i>
    </Icon>
  </Link>
);

export const EditButton = (props) => (
  <Icon {...props}>
    <i aria-hidden className="far fa-edit"></i>
  </Icon>
);

export const UploadPhotoButton = (props) => (
  <Icon {...props}>
    <i aria-hidden className="fas fa-camera-retro"></i>
  </Icon>
);

export const MoveButton = (props) => (
  <Icon {...props}>
    <i aria-hidden className="fas fa-expand-arrows-alt"></i>
  </Icon>
);
