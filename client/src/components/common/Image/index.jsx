import React from 'react';
import './styles.scss';

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
    <div className={`img-container ${imageUrl ? `img-${type}` : ''}`}>
      <img src={imageUrl || placeholderUrl} alt="" />
    </div>
  );
};

export default Image;
