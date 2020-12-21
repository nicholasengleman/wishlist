import React from 'react';
import Menu from '../Menu';

const Header = ({ logoutHandler }) => (
  <div className="header-nav">
    <Menu>
      <button type="button" onClick={logoutHandler}>
        Logout
      </button>
    </Menu>
    <Menu type="red">
      <button type="button" onClick={logoutHandler}>
        Logout
      </button>
    </Menu>
  </div>
);

export default Header;
