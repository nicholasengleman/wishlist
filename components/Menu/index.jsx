import React from 'react';
import Styled from 'styled-components';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useSelector, useDispatch  } from 'react-redux';

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
    border-radius: 5px;
`;

const Menu = ({ menuName, onClose, onCloseCb, children, left, right, top, bottom }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.menus[menuName]);

  const handleClose = () => {
    if (onClose) {
      dispatch(onClose);
    }
    if (onCloseCb) {
      onCloseCb();
    }
  };

  const ref = useDetectClickOutside({ onTriggered: handleClose });

  if (!status) {
    return null;
  }

  return (
    <StyledMenu left={left} right={right} top={top} bottom={bottom} ref={ref}>
      {children}
    </StyledMenu>
  );
};



export default Menu;