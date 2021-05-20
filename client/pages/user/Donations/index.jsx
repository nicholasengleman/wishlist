import React from 'react';
import Styled from 'styled-components';

const DonationBar = Styled.div`
    width: 100%;
    height: 30px;
    border-radius: 6px;
    background-color: #dee0e0;
`;

const Progress = Styled.div`
    height: 100%;
    width: 50%;
    border-radius: 6px;
    position: relative;
    background: linear-gradient(-90deg, #71f7f2, #36b8e9); /* Standard syntax */
    z-index: 3;
`;

const Raised = Styled.div`
    position: absolute;
    right: 15px;
    line-height: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    height: 100%;
`;

const Donations = () => (
  <DonationBar>
    <Progress>
      <Raised>$2.50</Raised>
    </Progress>
  </DonationBar>
);

export default Donations;
