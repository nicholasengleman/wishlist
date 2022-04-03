import React from 'react';
import styled from 'styled-components';
import Avatar from 'components/Avatar';
import { Row, Column } from 'components/Flex';

const DonarsContainer = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 10px;
  }
`;

const SubsRemaining = styled.div`
  font-size: 10px;
  color: #023047;
  z-index: 10;
  border: 2px solid #023047;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -15px;
  background: white;
`;

const DonorAvatar = styled(Avatar)`
  margin-left: -15px;
  border-radius: 50%;
  border: 2px solid #023047;
  filter: brightness(0.9);
  img {
    border: none;
  }
  &::before {
    display: none;
  }
`;

const Donors = ({ max = 6 }) => {
  const subsTotal = Math.floor(Math.random() * max) + 1;

  return (
    <DonarsContainer>
      <p>from {subsTotal * 3} fans</p>
      <Row gap="0" margin="5px 0 5px 15px">
        {Array.from(Array(subsTotal)).map((val, i) => (
          <DonorAvatar size={0} key={i} />
        ))}
        <SubsRemaining>+{subsTotal * 2}</SubsRemaining>
      </Row>
    </DonarsContainer>
  );
};

export default Donors;
