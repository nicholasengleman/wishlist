import React from 'react';
import styled from 'styled-components';

const StyledMenu = styled.div`
  height: 100px;
  width: 100px;
  border: 1px solid black;
`;

const RedMenu = styled(StyledMenu)`
  border: 5px solid red;
`;

const Menu = ({ type, children }) => {
  if (type === 'red') {
    return <RedMenu>{children}</RedMenu>;
  }

  return <StyledMenu>{children}</StyledMenu>;
};

export default Menu;
