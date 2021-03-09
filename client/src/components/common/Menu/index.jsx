import React from 'react';
import Styled from 'styled-components';
import { useSelector } from 'react-redux';

const StyledMenu = Styled.div`
    background-color: white;
    box-sizing: content-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    position: absolute;
    left: ${({ left }) => left || ''};
    right: ${({ right }) => right || ''};
    top: ${({ top }) => top || ''};
    bottom: ${({ bottom }) => bottom || ''};
    width: min-content;
    color: black;
`;

const Menu = (props) => {
  const { status } = useSelector((state) => state.menus[props.menuName]);

  if (!status) {
    return null;
  }

  return (
    <StyledMenu {...props} onClick={(e) => e.stopPropagation()}>
      {props.children}
    </StyledMenu>
  );
};

export default Menu;
