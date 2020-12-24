import React, { createContext, useContext, useState } from 'react';
import styled from 'styled-components';

const StyledMenuContainer = styled.ul`
  list-style: none;
  position: relative;
  margin: 0;
  padding: 0;
`;

const StyledMenuButton = styled.li`
  display: flex;
  align-items: center;
  font-size: 18px;
  color: black;
  font-weight: 400;
  cursor: pointer;
  padding: 10px 30px 10px 20px;
  border-radius: 3px;
  .fas.fa-angle-down {
    position: absolute;
    right: 5px;
    transition: all 0.2s;
    transform: ${(props) => (props.menuStatus ? 'rotate(180deg)' : '')};
  }
  .fas {
    margin-right: 15px;
  }
  p {
    margin: 0 30px 0 0;
  }
`;

const StyledMenuList = styled.ul`
  display: block;
  transform-origin: top center;
  transition: all 0.1s ease-in-out;
  opacity: ${(props) => (props.menuStatus ? '1' : '0')};
  transform: ${(props) => (props.menuStatus ? 'scaleY(1)' : 'scaleY(0)')};
  position: absolute;
  box-sizing: border-box;
  top: 50px;
  list-style: none;
  background-color: white;
  padding: 12px;
  width: 100%;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.08);
  color: #333;
  border-radius: 3px;
`;

const StyledMenuItem = styled.li`
  padding: 8px 10px;
  font-weight: 600;
  font-size: 16px;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;

const StyledMenuItemCategory = styled(StyledMenuItem)`
  color: #666;
  text-transform: uppercase;
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
    <StyledMenuButton
      menuStatus={menuStatus}
      onClick={() => toggleMenuStatus(!menuStatus)}
    >
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

export const MenuItemCategory = ({ children }) => (
  <StyledMenuItemCategory>{children}</StyledMenuItemCategory>
);
