import React from 'react';
import Styled from 'styled-components';

const StyledBox = Styled.div`
  width: 100%;
  padding: 1.25rem;
  box-sizing: border-box;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  `;

const Box = ({ children }) => <StyledBox>{children}</StyledBox>;

export default Box;
