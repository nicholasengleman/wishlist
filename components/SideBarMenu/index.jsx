import React, { useState } from 'react';
import styled from 'styled-components';

const StyledSideBarMenu = styled.ul`
  min-width: 150px;
  margin: 0 30px 0 0;
  list-style: none;
  padding: 0;
  border-right: 1px solid lightblue;

  li {
    padding: 10px;
    font-size: 18px;
    color: #6e6d7a;
    cursor: pointer;
    border-bottom: 1px solid lightblue;
    &.active {
      color: #333;
      font-weight: 600;
    }
    &:hover {
      color: #333;
    }
  }
`;

const SideBarMenu = (props) => {
  const [itemSelected, setItemSelected] = useState('');

  const handleItemSelected = (item) => {
    setItemSelected(item);
    if (props.itemSelectedCb) {
      props.itemSelectedCb(item);
    }
  };

  return (
    <StyledSideBarMenu {...props}>
      {props.items.map((item, index) => (
        <li
          key={index}
          onClick={() => handleItemSelected(item)}
          className={itemSelected === item ? 'active' : ''}
        >
          {item}
        </li>
      ))}
    </StyledSideBarMenu>
  );
};

export default SideBarMenu;
