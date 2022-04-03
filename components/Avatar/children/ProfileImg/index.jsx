import React from 'react';
import styled from 'styled-components';
import CloudinaryImage from 'components/CloudinaryImage';

const AvatarSizes = ['30px', '45px', '225px'];

const BaseAvatar = styled.div`
  height: ${(props) => AvatarSizes[props.size]};
  width: ${(props) => AvatarSizes[props.size]};
  margin: ${(props) => props.margin || ''};
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    border-radius: 50%;
    background: linear-gradient(to right, red, orange);
  }
  img {
    height: 100%;
    width: auto;
    border-radius: 50%;
    border: ${(props) => `${5 * Number(props.size)}px solid transparent`};
  }
`;

const Avatar = ({ publicId, size = 1, className }) => {
  if (publicId) {
    return (
      <BaseAvatar size={size} className={className}>
        <CloudinaryImage id={publicId} />
      </BaseAvatar>
    );
  }
  return (
    <BaseAvatar size={size}>
      <img src="/placeholder-person.png" alt="placeholder" />
    </BaseAvatar>
  );
};

export default Avatar;
