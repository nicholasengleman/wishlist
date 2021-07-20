import React from 'react';
import Styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { SubmitButton } from 'components/Buttons/SubmitButton';
import { CancelButton } from 'components/Buttons/CancelButton';

import { EditButton, MoveButton } from 'components/IconButtons';

import { toggleEditCoverMenu } from '/redux/actions/menus';
import EditCoverMenu from 'pages/user/menus/EditCover';

const StyledEditCoverButtons = Styled.div`
    position: absolute;
    bottom: ${(props) => (props.coverReposition ? '20px' : '-20px')};
    right: ${(props) => (props.coverReposition ? '20px' : '0')};
    display: flex;
    gap: 20px;
    justify-content: flex-end;
`;

const EditCoverButtons = ({
  coverReposition,
  handleSaveReposition,
  toggleReposition,
}) => {
  const dispatch = useDispatch();

  return (
    <StyledEditCoverButtons coverReposition={coverReposition}>
      {coverReposition && (
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
      {!coverReposition && (
        <>
          <EditButton onClick={() => dispatch(toggleEditCoverMenu())}>
            Edit Cover
          </EditButton>
          <MoveButton onClick={() => toggleReposition()}>Reposition</MoveButton>
        </>
      )}
      <EditCoverMenu top="50px" right="100px" />
    </StyledEditCoverButtons>
  );
};

export default EditCoverButtons;
