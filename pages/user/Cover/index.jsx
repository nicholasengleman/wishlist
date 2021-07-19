import React, { useState } from 'react';
import { Image, Placeholder, Transformation } from 'cloudinary-react';
import Styled from 'styled-components';
import { useUser } from '@auth0/nextjs-auth0';

import useGetUser from 'hooks/useGetUser';
import useUpdateUser from '/hooks/useUpdateUser';

import EditCoverButtons from './children/EditCoverButtons';

let dragImg;

const StyledCover = Styled.div`
  background-color: grey;
  width: 100%;
  height: 100%;
  position: relative;
  height: ${(props) => props.height};
  cursor: ${({ reposition }) => (reposition ? 'move' : '')};

  .coverImg-container {
    overflow: hidden;
    max-height: 100%;
    height: 100%;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      overflow: hidden;
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

const Cover = ({ editable, height }) => {
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

  const handleSaveReposition = () => {
    useUpdateUser(user.sub, { coverImgPosition: currentDrag });
    toggleReposition();
  };

  const handleDrag = (e) => {
    if (reposition && e.clientY) {
      setCurrentDrag(lastDrag + e.clientY - dragStart);
    }
  };

  const handleDragStart = (e) => {
    if (reposition) {
      setDragStart(e.clientY);
      e.dataTransfer.setDragImage(dragImg, 0, 0);
    }
  };

  const handleDragEnd = () => {
    if (reposition) {
      setLastDrag(currentDrag);
    }
  };

  return (
    <StyledCover
      reposition={reposition}
      onDrag={handleDrag}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      height={height}
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
      {editable && (
        <EditCoverButtons
          reposition={reposition}
          handleSaveReposition={handleSaveReposition}
          toggleReposition={toggleReposition}
        />
      )}
    </StyledCover>
  );
};

export default Cover;
