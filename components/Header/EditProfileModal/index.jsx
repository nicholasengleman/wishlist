import React, { useState } from 'react';
import { toggleSettingsModal } from 'redux/actions/modals';
import { SubmitButton } from 'components/Buttons/SubmitButton';

import SideBarMenu from 'components/SideBarMenu';
import Modal from 'components/Modal';
import { FlexContainer } from 'components/Flex';
import EditProfilePanel from 'components/Header/EditProfileModal/editProfilePanel';

const EditProfile = () => {
  const [selectedPanel, setSelectedPanel] = useState('Edit Profile');

  return (
    <Modal modalName="settingsModal" onClose={toggleSettingsModal()}>
      <EditProfilePanel />
    </Modal>
  );
};

export default EditProfile;
