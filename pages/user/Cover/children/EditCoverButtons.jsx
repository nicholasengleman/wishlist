import React from 'react';
import Styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { EditButton } from 'components/Buttons/EditButton';
import { SubmitButton } from 'components/Buttons/SubmitButton';
import { CancelButton } from 'components/Buttons/CancelButton';

import { toggleEditCoverMenu } from '/redux/actions/menus';
import EditCoverMenu from 'pages/user/menus/EditCover';

const StyledEditCoverButtons = Styled.div`
    position: absolute;
    bottom: 15px;
    right: 20px;
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

  return (
    <StyledEditCoverButtons>
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
          <EditButton
            as="div"
            small={true}
            onClick={() => dispatch(toggleEditCoverMenu())}
          >
            Edit Cover
            <EditCoverMenu top="40px" right="0" />
          </EditButton>
          <EditButton as="div" small={true} onClick={() => toggleReposition()}>
            Reposition
          </EditButton>
        </>
      )}
    </StyledEditCoverButtons>
  );
};

export default EditCoverButtons;
