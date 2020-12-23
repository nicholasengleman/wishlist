import React from 'react';
import styled from 'styled-components';
import Avatar from '../../../common/Avatar';

const DonarsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 15px;

  .subsRemaining {
    font-size: 14px;
    color: white;
    font-weight: 600;
    z-index: 10;
    margin-left: -30px;
  }
`;

const DonorAvatar = styled(Avatar)`
  margin-left: -15px;
  border: 2px solid darkcyan;
  filter: brightness(0.8);
`;

const Donors = () => {
  const subsTotal = Math.floor(Math.random() * 6) + 1;

  return (
    <DonarsContainer>
      {Array.from(Array(subsTotal)).map(() => (
        <DonorAvatar size="0" key={`${Math.random()}`} />
      ))}
      <div className="subsRemaining">+{subsTotal * 2}</div>
    </DonarsContainer>
  );
};

export default Donors;
