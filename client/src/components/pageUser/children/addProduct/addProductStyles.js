import styled from 'styled-components';

export default styled.div`
  max-width: 90%;
  transition: all 0.2s;
  box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px,
    rgba(15, 15, 15, 0.2) 0px 9px 24px;
  background: white;
  position: fixed;
  top: 200px;
  z-index: 100;
  left: 50%;
  border-radius: 10px;
  transform: ${({ visibility }) => (visibility ? 'scale(1) translateX(-50%)' : 'scale(0.9) translateX(-50%)')};
  opacity: ${({ visibility }) => (visibility ? '1' : '0')};
  z-index: ${({ visibility }) => (visibility ? '10' : '0')};
  min-width: 700px;
  min-height: 700px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .form-header {
    background-color: #5850ec;
    padding: 30px;
    color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 25px;
      margin-bottom: 10px;
    }
    .close {
      cursor: pointer;
      transition: all 0.1s;
      transform-origin: center 15%;
      &:hover {
        transform: scale(1.5);
      }
    }
  }

  .form-sections {
    display: flex;
    .section {
      width: 50%;
      border: 1px solid #d3d3d3;
      font-size: 16px;
      padding: 10px;
      font-weight: 600;
      color: darkgray;
      outline: none;
      cursor: pointer;
      &.selected {
        border-bottom: 2px solid #5850ec;
        span {
          color: #5850ec;
        }
      }
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    width: 50%;
    label {
      margin-bottom: 5px;
    }
    input,
    textarea {
      border-radius: 5px;
      border: 1px solid #d3d3d3;
      background-image: none !important;
      background: none !important;
      padding: 5px 10px;
      font-size: 16px;
      margin-bottom: 20px;
    }
    .short {
      width: 50%;
    }
  }

  .flex-container {
    display: flex;
    justify-content: space-between;
    padding: 40px 40px 0 40px;
    flex: 2;
    .image-upload {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: lightgray;
      margin: 20px 0 20px 20px;
    }
  }

  .tag-container-title {
    padding: 0 40px;
    margin-bottom: 15px;
  }

  .tag-container {
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    .tag {
      border: 1px solid #d3d3d3;
      border-radius: 20px;
      padding: 2px 15px;
      margin: 0 5px 10px 0;
      cursor: pointer;
    }
  }

  .form-footer {
    background-color: #f5f5f5;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 30px;
  }

  .btn {
    padding: 7px 0;
    width: 160px;
    border: 5px;
    border-radius: 5px;
    background-color: #5850ec;
    color: white;
    font-size: 16px;
    letter-spacing: 2px;
    margin-left: 25px;
    outline: none;
    cursor: pointer;
    &.cancel {
      background-color: white;
      color: black;
      border: 1px solid #d3d3d3;
    }
    &.small {
      width: 120px;
    }
  }

  .contribution-detail-container {
    padding: 40px;
    flex: 2;
  }

  .panel-container {
    display: flex;
    flex: 1;
    &.section-1-selected {
      transform: translateX(0);
    }
    &.section-2-selected {
      transform: translateX(-100%);
    }
    .panel {
      min-width: 100%;
    }
  }
`;
