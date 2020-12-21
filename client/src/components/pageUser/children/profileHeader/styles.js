import styled from 'styled-components';
import device from '../../../../utils/breakpoints';

export default styled.div`
  font-family: 'Varela Round', sans-serif;
  background-color: #72a065;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  .c-header {
    width: 100%;
    height: 500px;
    padding: 0 75px;
    max-width: 1250px;
    margin: 0 auto;

    @media ${device.desktopSM} {
      height: 280px;
    }
    .c-nav {
      height: 100px;
      @media ${device.desktopSM} {
        height: 50px;
      }
    }
    .c-header-info {
      display: flex;
      margin-top: 150px;
      position: relative;
      @media ${device.desktopSM} {
        margin-top: 50px;
      }
      .c-profileImg {
        background-color: whitesmoke;
        border-radius: 50px;
        width: 300px;
        height: 400px;

        @media ${device.desktopSM} {
          width: 200px;
          height: 250px;
        }
      }
      .c-info {
        padding: 30px;
        @media ${device.desktopSM} {
          padding: 10px 30px;
        }
        .name {
          font-size: 4rem;
          color: white;
          margin-bottom: 0.75rem;
          letter-spacing: 2px;
          @media ${device.desktopSM} {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
          }
        }
        .title {
          color: white;
          font-size: 2rem;
          margin-bottom: 1rem;
          letter-spacing: 2px;
          @media ${device.desktopSM} {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
          }
        }
        .c-stats {
          .c-followers {
            font-size: 1.5rem;
            display: flex;
            font-weight: 500;
            color: white;
            @media ${device.desktopSM} {
              font-size: 1rem;
            }
            .followerImg {
              height: 60px;
              width: 60px;
              border-radius: 10px;
              background-color: lightblue;
              margin-right: 10px;
              @media ${device.desktopSM} {
                height: 40px;
                width: 40px;
              }
            }
            .followerNumber {
              margin-bottom: 0.5rem;
              display: inline-block;
            }
          }
        }
      }
      .button-menu {
        height: 50px;
        position: absolute;
        bottom: 0;
        left: 50%;
      }
    }
  }
`;
