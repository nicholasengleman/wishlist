import React from 'react';
import StyledProfileHeader from './styles';

const ProfileHeader = () => (
  <StyledProfileHeader>
    <div className="c-header">
      <div className="c-header-info">
        <div className="c-profileImg" />
        <div className="c-info">
          <div className="name">Bernadette E.</div>
          <div className="title">Title</div>
          <div className="c-stats">
            <div className="c-followers">
              <div className="followerImg" />
              <div className="followerData">
                <div>
                  <span className="followerNumber">280</span>
                  <span>K</span>
                </div>
                <p>Followers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </StyledProfileHeader>
);

export default ProfileHeader;
