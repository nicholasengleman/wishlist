import React from 'react';
import styled from 'styled-components';
import { Image, Placeholder, Transformation } from 'cloudinary-react';

const AvatarSizes = ['35px', '45px', '175px'];

const BaseAvatar = styled.div`
  height: ${(props) => AvatarSizes[props.size]};
  width: ${(props) => AvatarSizes[props.size]};
  margin: ${(props) => props.margin || ''};
  img {
    height: 100%;
    width: auto;
    border-radius: 50%;
    border: ${(props) => `${1 + Number(props.size)}px solid white`};
  }
`;

const Avatar = ({ publicId, size = 2, margin }) => {
  if (publicId) {
    return (
      <BaseAvatar size={size} margin={margin}>
        <Image cloudName="dazynasdm" publicId={publicId} loading="lazy">
          <Transformation quality="auto" fetchFormat="auto" />
          <Placeholder type="blur" />
        </Image>
      </BaseAvatar>
    );
  }
  return (
    <BaseAvatar size={size} margin={margin}>
      <img src="/placeholder-person.png" alt="placeholder" />
    </BaseAvatar>
  );
};

export default Avatar;
