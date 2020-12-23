import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const AvatarSizes = ['40px', '60px', '80px'];

const BaseAvatar = styled.img`
  height: ${(props) => AvatarSizes[props.size]};
  width: ${(props) => AvatarSizes[props.size]};
  border-radius: 50%;
`;

const Avatar = ({ className, url, size = 2 }) => {
  const [demoImg, setDemoImg] = useState();

  console.log('component rendered');

  useEffect(() => {
    console.log('useEffect Called');
    axios
      .get('https://randomuser.me/api/?results=1')
      .then((response) => {
        setDemoImg(response.data.results[0].picture.medium);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  return <BaseAvatar className={className} src={url || demoImg} size={size} />;
};

export default Avatar;
