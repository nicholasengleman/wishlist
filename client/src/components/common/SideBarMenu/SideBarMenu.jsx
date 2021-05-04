import React, { useState } from 'react';
import styled from 'styled-components';

const StyledSideBarMenu = styled.ul`
  min-width: 150px;
  margin-right: 50px;

  li {
    padding: 10px 0;
    font-size: 18px;
    color: #6e6d7a;
    cursor: pointer;
    &.active {
      color: #333;
      font-weight: 700;
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
