import React, { useState } from 'react';
import SideBarMenu from '../../../../../components/common/SideBarMenu/SideBarMenu';
import { toggleSettingsModal } from '../../../../../redux/actions/modals';
import Modal from '../../../../common/Modal';
import { FlexContainer } from '../../../../common/Flex';
import EditProfilePanel from './editProfilePanel';
import EditPasswordPanel from './editPasswordPanel';

const EditProfile = () => {
  const [selectedPanel, setSelectedPanel] = useState('');

  return (
    <Modal modalName="settingsModal" onOverlayClick={toggleSettingsModal()}>
      <FlexContainer flexWrap="nowrap">
        <SideBarMenu
          items={['Edit Profile', 'Password']}
          itemSelectedCb={setSelectedPanel}
        />
        {selectedPanel === 'Edit Profile' && <EditProfilePanel />}
        {selectedPanel === 'Password' && <EditPasswordPanel />}
      </FlexContainer>
    </Modal>
  );
};

export default EditProfile;
