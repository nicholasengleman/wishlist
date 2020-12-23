import React, { createContext, useContext, useState } from 'react';
import styled from 'styled-components';

const StyledMenuContainer = styled.ul`
  list-style: none;
  position: relative;
`;

const StyledMenuButton = styled.li`
  display: flex;
  align-items: center;
  font-size: 18px;
  color: yellow;
  font-weight: 600;
  cursor: pointer;
`;

const StyledMenuList = styled.ul`
  display: ${(props) => (props.menuStatus ? 'block' : 'none')};
  position: absolute;
  top: 0;
  list-style: none;
  background-color: white;
`;

const StyledMenuItem = styled.li`
  padding: 10px 5px;
`;

const MenuContext = createContext();

export const MenuContainer = ({ children }) => {
  const [menuStatus, toggleMenuStatus] = useState(false);
  return (
    <MenuContext.Provider value={{ menuStatus, toggleMenuStatus }}>
      <StyledMenuContainer>{children}</StyledMenuContainer>
    </MenuContext.Provider>
  );
};

export const MenuButton = ({ children }) => {
  const { menuStatus, toggleMenuStatus } = useContext(MenuContext);
  return (
    <StyledMenuButton onClick={() => toggleMenuStatus(!menuStatus)}>
      {children}
    </StyledMenuButton>
  );
};

export const MenuList = ({ children }) => {
  const { menuStatus } = useContext(MenuContext);
  return <StyledMenuList menuStatus={menuStatus}>{children}</StyledMenuList>;
};

export const MenuItem = ({ children }) => (
  <StyledMenuItem>{children}</StyledMenuItem>
);
