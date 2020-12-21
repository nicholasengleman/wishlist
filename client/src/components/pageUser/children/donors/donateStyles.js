import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 10px 0 0 20px;
  .subThumbnail {
    height: 40px;
    min-width: 40px;
    width: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: -15px;
    border: 2px solid darkcyan;
    position: relative;
  }
  .subsRemaining {
    color: white;
    position: absolute;
    top: 10px;
    left: 6px;
    z-index: 1;
    font-weight: 600;
    font-size: 14px;
  }
  .tint {
    filter: brightness(0.5);
  }
  .subsTotal {
    font-size: 14px;
    color: #7598db;
    font-weight: 600;
    margin-left: 20px;
  }
`;
