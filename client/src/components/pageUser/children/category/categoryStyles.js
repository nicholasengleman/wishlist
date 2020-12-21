import styled from "styled-components";
import device from "./../../utils/breakpoints";

export default styled.div`
  margin: 0 auto;
  font-family: "Varela Round", sans-serif;
  margin-bottom: 50px;
  border-bottom: 1px solid lightgray;
  max-width: 1250px;
  padding: 0 75px;

  @media ${device.desktopSM} {
    margin: 0 auto 50px auto;
  }
  .c-category-header {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    margin-bottom: 50px;
    position: relative;
    @media ${device.desktopSM} {
      margin-bottom: 25px;
    }
    .name {
      font-size: 3.5rem;
      border: none;
      width: fit-content;
      @media ${device.desktopSM} {
        font-size: 2rem;
      }
      &.editMode {
        background-color: lightsteelblue;
        font-size: 1.5rem;
        padding-left: 10px;
        color: black;
      }
    }
    .edit {
      font-size: 2rem;
      @media ${device.desktopSM} {
        font-size: 1.5rem;
      }
    }
  }
  .c-category-body {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;