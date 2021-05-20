import React, { useState } from 'react';
import { toggleSettingsModal } from 'redux/actions/modals';

import SideBarMenu from 'components/SideBarMenu';
import Modal from 'components/Modal';
import { FlexContainer } from 'components/Flex';
import EditProfilePanel from 'components/Header/EditProfile/editProfilePanel';
import EditPasswordPanel from 'components/Header/EditProfile/editPasswordPanel';

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
