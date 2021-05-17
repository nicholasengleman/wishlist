import React, { useState } from 'react';
import SideBarMenu from '../../SideBarMenu/SideBarMenu';
import { toggleSettingsModal } from '../../../../redux/actions/modals';
import Modal from '../../Modal';
import { FlexContainer } from '../../Flex';
import EditProfilePanel from './editProfilePanel';
import EditPasswordPanel from './editPasswordPanel';

const EditProfile = () => {
  const [selectedPanel, setSelectedPanel] = useState('Edit Profile');

  return (
    <Modal
      modalName="settingsModal"
      onClose={toggleSettingsModal()}
      onCloseCb={() => setSelectedPanel('Edit Profile')}
    >
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
