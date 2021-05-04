import React from 'react';
import Styled from 'styled-components';

const margin = ['0.5rem', '1rem', '2rem'];

const ErrorMessage = Styled.span`
    display: inline-block;
    background-color: red;
    color: white;
    padding: 5px 7px;
    border-radius: 3px;
    font-size: 12px;
    width: fit-content;
    margin-top: 7px;
    margin-right: 7px;
    margin-bottom: 1rem;
    margin-bottom: ${({ marginSize }) => margin[marginSize]};
`;

const StyledErrorMessage = ({ message }) => {
  if (!message) {
    return null;
  }

  return <ErrorMessage>{message}</ErrorMessage>;
};

export default StyledErrorMessage;
