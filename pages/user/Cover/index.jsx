import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Image, Placeholder, Transformation } from 'cloudinary-react';
import Styled from 'styled-components';
import { useUser } from '@auth0/nextjs-auth0';

import { toggleEditCoverMenu } from '/redux/actions/menus';
import EditCoverMenu from 'pages/user/menus/EditCover';
import useGetUser from 'hooks/useGetUser';
import useUpdateUser from '/hooks/useUpdateUser';

import { EditButton } from 'components/Buttons/EditButton';
let dragImg;

const Cover = Styled.div`
  background-color: grey;
  height: ${({ hasImage }) => (hasImage ? 'inherit' : '150px')};
  width: 100%;
  position: relative;
  cursor: move;
  .coverImg-container {
    overflow: hidden;
    max-height: 100%;
    height: 100%;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
`;

const RepositionInstructions = Styled.span`
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    width: fit-content;
    margin-right: auto;
    margin-left: auto;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 3px;
    padding: 5px 10px;
    color: white;
    display: ${({ reposition }) => (reposition ? 'block' : 'none')};
`;

const StyledCover = () => {
  const dispatch = useDispatch();
  const { user, error, isLoading } = useUser();
  const { coverImg = '', coverImgPosition } = useGetUser(user?.sub);
  const [reposition, setReposition] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [lastDrag, setLastDrag] = useState(0);
  const [currentDrag, setCurrentDrag] = useState(coverImgPosition);

  if (typeof window !== 'undefined') {
    dragImg = document.createElement('img');
    dragImg.src =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  }

  const toggleReposition = () => {
    setReposition(!reposition);
  };

  const handleDrag = (e) => {
    if (e.clientY) {
      setCurrentDrag(lastDrag + e.clientY - dragStart);
    }
  };

  const handleDragStart = (e) => {
    setDragStart(e.clientY);
    e.dataTransfer.setDragImage(dragImg, 0, 0);
  };

  const handleDragEnd = () => {
    setLastDrag(currentDrag);
  };

  const handleSaveReposition = () => {
    useUpdateUser(user.sub, { coverImgPosition: currentDrag });
    toggleReposition();
  };

  return (
    <Cover
      hasImage={coverImg}
      onDrag={handleDrag}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <RepositionInstructions reposition={reposition}>
        Drag Image to Reposition.
      </RepositionInstructions>
      <div className="coverImg-container">
        <Image
          cloudName="dazynasdm"
          publicId={coverImg}
          loading="lazy"
          style={{
            objectPosition: `center ${currentDrag}px`,
          }}
        >
          <Transformation quality="auto" fetchFormat="auto" />
          <Placeholder type="blur" />
        </Image>
      </div>
      {reposition && (
        <EditButton
          as="div"
          position="absolute"
          bottom="15px"
          right={reposition ? '105px' : '120px'}
          small={true}
          onClick={() => handleSaveReposition()}
        >
          {'Save Position'}
        </EditButton>
      )}
      {!reposition && (
        <EditButton
          as="div"
          position="absolute"
          bottom="15px"
          right={reposition ? '105px' : '120px'}
          small={true}
          onClick={() => dispatch(toggleEditCoverMenu())}
        >
          {'Edit Cover'}
          <EditCoverMenu top="40px" right="0" />
        </EditButton>
      )}
      <EditButton
        as="div"
        position="absolute"
        bottom="15px"
        right="20px"
        small={true}
        onClick={toggleReposition}
      >
        {!reposition && 'Reposition'}
        {reposition && 'Cancel'}
      </EditButton>
    </Cover>
  );
};

export default StyledCover;
