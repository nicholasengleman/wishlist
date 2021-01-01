import React from 'react';
import Styled from 'styled-components';
import { buttonColor } from '../../../globalStyles/mixins';

const Icon = Styled.button`
  ${buttonColor}
  background: none;
  height: 35px;
  width: 35px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: blue;
  font-size: 22px;
  border-radius: 50%;
  margin-right: 10px;
  outline: transparent;
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
