import React from 'react';
import Styled from 'styled-components';
import Link from 'next/link';

const Icon = Styled.button`
  background-color: ${(props) => props.theme.buttonBgLight};
  transition: all 0.2s ease-in-out;
  height: 40px;
  width: 40px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  border-radius: 50%;
  margin-right: 10px;
  outline: transparent;
  position: relative;
  i {
    font-size: 16px;
  }
`;

export const AlarmButton = () => (
  <Icon>
    <i className="far fa-bell" />
  </Icon>
);

export const MenuButton = () => (
  <Icon>
    <i className="fas fa-angle-down" />
  </Icon>
);

export const CloseButton = ({ click }) => (
  <Icon>
    <i className="far fa-times-circle" onClick={click} />
  </Icon>
);

export const HomeButton = () => (
  <Link href="/">
    <Icon>
      <i className="fas fa-home"></i>
    </Icon>
  </Link>
);

export const EditButton = (props) => (
  <Icon {...props}>
    <i className="far fa-edit"></i>
  </Icon>
);

export const MoveButton = (props) => (
  <Icon {...props}>
    <i className="fas fa-expand-arrows-alt"></i>
  </Icon>
);
