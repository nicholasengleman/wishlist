import React from 'react';
import { useDispatch } from 'react-redux';
import { Image, Placeholder, Transformation } from 'cloudinary-react';
import { toggleEditCoverMenu } from '../../../../redux/actions/menus';
import Styled from 'styled-components';
import EditCoverMenu from '../menus/EditCover';
import { EditButton } from '../../../common/Button';
import useGetUser from '../../../../hooks/useGetUser';

const Cover = Styled.div`
  margin-bottom: 1rem;
  background-color: grey;
  height: 250px;
  width: 100%;
  position: absolute;
  .coverImg-container {
    overflow: hidden;
    max-height: 100%;
  }
`;

const StyledCover = () => {
  const dispatch = useDispatch();
  const publicId = useGetUser('coverImg');

  return (
    <Cover>
      <div className="coverImg-container">
        <Image cloudName="dazynasdm" publicId={publicId} loading="lazy">
          <Transformation quality="auto" fetchFormat="auto" />
          <Placeholder type="blur" />
        </Image>
      </div>
      <EditButton
        as="div"
        position="absolute"
        bottom="20px"
        right="20px"
        onClick={() => dispatch(toggleEditCoverMenu())}
      >
        Edit Cover
        <EditCoverMenu top="40px" right="0" />
      </EditButton>
    </Cover>
  );
};

export default StyledCover;
