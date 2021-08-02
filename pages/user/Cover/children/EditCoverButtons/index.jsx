import React from 'react';
import Styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { toggleEditCoverMenu } from '/redux/actions/menus';

import { SubmitButton } from 'components/Buttons/SubmitButton';
import { CancelButton } from 'components/Buttons/CancelButton';
import { EditButton, MoveButton } from 'components/IconButtons';
import EditCoverMenu from '../EditCoverMenu';

const StyledEditCoverButtons = Styled.div`
    position: absolute;
    bottom: ${(props) => (props.reposition ? '20px' : '-20px')};
    right: ${(props) => (props.reposition ? '20px' : '0')};
    display: flex;
    gap: 20px;
    justify-content: flex-end;
`;

const EditCoverButtons = ({
  reposition,
  handleSaveReposition,
  toggleReposition,
}) => {
  const dispatch = useDispatch();

  const handleToggleEditCoverMenu = (e) => {
    dispatch(toggleEditCoverMenu());
    e.stopPropagation();
  }

  return (
    <StyledEditCoverButtons reposition={reposition}>
      {reposition && (
        <>
          <CancelButton small={true} onClick={() => toggleReposition()}>
            Cancel
          </CancelButton>
          <SubmitButton
            as="div"
            small={true}
            onClick={() => handleSaveReposition()}
          >
            Save
          </SubmitButton>
        </>
      )}
      {!reposition && (
        <>
          <EditButton onClick={(e) => handleToggleEditCoverMenu(e)} />
          <MoveButton onClick={() => toggleReposition()} />
        </>
      )}
      <EditCoverMenu top="50px" right="100px" />
    </StyledEditCoverButtons>
  );
};

export default EditCoverButtons;
