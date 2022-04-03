import Styled from 'styled-components';

const Bar = Styled.div`
    width: 100%;
    height: 10px;
    border-radius: 5px;
    box-shadow: inset 12px 2px 9px 0px rgba(0,0,0,0.3);
    margin-bottom: 12px;
`;

const Progress = Styled.div`
    width: 60%;
    height: 100%;
    background: linear-gradient(to right, red, orange);
    border-radius: 5px;
`;

const ProgressBar = () => (
  <Bar>
    <Progress />
  </Bar>
);

export default ProgressBar;
