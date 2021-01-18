import React from 'react';
import styled from 'styled-components';

const AvatarSizes = ['35px', '45px', '175px'];

const BaseAvatar = styled.img`
  height: ${(props) => AvatarSizes[props.size]};
  width: ${(props) => AvatarSizes[props.size]};
  border-radius: 50%;
  border: ${(props) => `${1 + Number(props.size)}px solid white`};
`;

const Avatar = ({ className, url, size = 2 }) => {
  return <BaseAvatar className={className} src={url} size={size} />;
};

export default Avatar;
