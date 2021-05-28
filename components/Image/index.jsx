import React from 'react';
import styled from 'styled-components';

const StyledImage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  height: 300px;
  img {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    max-width: 100%;
    object-fit: contain;
  }
`;

const Image = ({ imageUrl, type }) => {
  let placeholderUrl = '';

  switch (type) {
    case 'product':
      placeholderUrl = 'https://via.placeholder.com/300';
      break;
    default:
      placeholderUrl = 'https://via.placeholder.com/150';
  }

  return (
    <StyledImage>
      <img src={imageUrl || placeholderUrl} alt="" />
    </StyledImage>
  );
};

export default Image;
