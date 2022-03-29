import React, { createContext, useContext, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const StyledMenuContainer = styled.ul`
  list-style: none;
  position: relative;
  margin: 0;
  padding: 0;
`;

const StyledMenuHeader = styled.li`
  display: flex;
  align-items: center;
  button {
    margin: 0;
  }
  .fas {
    transition: all 0.2s;
    transform: ${(props) => (props.menuStatus ? 'rotate(180deg)' : '')};
  }
`;

const StyledMenuList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  transform-origin: top center;
  transition: all 0.1s ease-in-out;
  opacity: ${(props) => (props.menuStatus ? '1' : '0')};
  transform: ${(props) => (props.menuStatus ? 'scaleY(1)' : 'scaleY(0)')};
  position: absolute;
  box-sizing: border-box;
  top: 40px;
  right: 0;
  list-style: none;
  background-color: white;
  width: 100%;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.08);
  color: #333;
  border-radius: 5px;
  min-width: 200px;
  padding: 15px;
`;

const StyledMenuItem = styled.li`
  padding: 0;
  font-size: 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.1s;

  button {
    background: none;
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: ${(props) => props.theme.borderRadius};
    padding: 10px;
    cursor: pointer;
    transition: all 0.1s;
    border: none;
    &:hover {
      background: ${(props) => props.theme.btnBackgroundHover};
      p {
        color: ${(props) => props.theme.btnTextHover};
      }
      i {
        color: ${(props) => props.theme.iconColorHover};
      }
    }
  }
  p {
    margin: 0;
    transition: all 0.1s;
    color: ${(props) => props.theme.btnText};
  }
  i {
    font-size: 14px;
    margin-right: 10px;
    transition: all 0.1s;
    color: ${(props) => props.theme.iconColor};
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

export const MenuHeader = ({ children }) => {
  const { menuStatus, toggleMenuStatus } = useContext(MenuContext);
  return (
    <StyledMenuHeader
      menuStatus={menuStatus}
      onClick={() => toggleMenuStatus(!menuStatus)}
    >
      {children}
    </StyledMenuHeader>
  );
};

export const MenuList = ({ children }) => {
  const { menuStatus } = useContext(MenuContext);
  return <StyledMenuList menuStatus={menuStatus}>{children}</StyledMenuList>;
};

export const MenuItem = ({ children, onClick, href }) => {
  const { toggleMenuStatus } = useContext(MenuContext);
  const router = useRouter();
  const handleClick = () => {
    toggleMenuStatus();
    if (onClick) {
      onClick();
    }
    if (href) {
      router.push(href);
    }
  };
  return (
    <StyledMenuItem onClick={handleClick}>
      <button>{children}</button>
    </StyledMenuItem>
  );
};

export const MenuItemCategory = ({ children }) => (
  <StyledMenuItemCategory>{children}</StyledMenuItemCategory>
);
