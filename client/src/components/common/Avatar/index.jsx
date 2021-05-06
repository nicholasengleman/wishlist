import React from 'react';
import styled from 'styled-components';
import { Image, Placeholder, Transformation } from 'cloudinary-react';
import placeholder from '../../../resources/images/placeholder-person.png';

const AvatarSizes = ['35px', '45px', '175px'];

const BaseAvatar = styled.div`
  height: ${(props) => AvatarSizes[props.size]};
  width: ${(props) => AvatarSizes[props.size]};
  img {
    height: auto;
    width: 100%;
    border-radius: 50%;
    border: ${(props) => `${1 + Number(props.size)}px solid white`};
  }
`;

const Avatar = ({ className, publicId, size = 2 }) => {
  if (publicId) {
    return (
      <BaseAvatar size={size}>
        <Image cloudName="dazynasdm" publicId={publicId} loading="lazy">
          <Transformation quality="auto" fetchFormat="auto" />
          <Placeholder type="blur" />
        </Image>
      </BaseAvatar>
    );
  }
  return (
    <BaseAvatar size={size}>
      <img src={placeholder} alt="placeholder" />
    </BaseAvatar>
  );
};

export default Avatar;
