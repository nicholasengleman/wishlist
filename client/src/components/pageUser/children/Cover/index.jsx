import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleEditCoverMenu } from '../../../../redux/actions/menus';
import Styled from 'styled-components';
import EditCoverMenu from '../menus/EditCover';
import { EditButton } from '../../../common/Button';

const Cover = Styled.div`
  margin-bottom: 1rem;
  background-color: grey;
  height: 250px;
  width: 100%;
  position: absolute;
`;

const StyledCover = () => {
  const dispatch = useDispatch();

  return (
    <Cover>
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
