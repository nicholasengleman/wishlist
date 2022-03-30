import Styled from 'styled-components';

export default Styled.div`

.c-section-list {
    position: relative;

.btn-add,
    .btn-show-all {
        border: none;
        width: none;
        font-size: 10px;
        color: #BC1A6E;
        font-weight: 700;
        cursor: pointer;
        padding: 5px 15px;
        border-radius: 5px;
    }

    .btn-show-all {
        position: absolute;
        top: -40px;
        left: 0;
    }

    .section {
        display: flex;
        margin-bottom: 10px;
        align-items: center;


        &:hover {
            i {
                opacity: 1;
            }
        }

    .section-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        border: none;
        cursor: pointer;
        width: 190px;
        height: 40px;
        background: linear-gradient(90deg,rgba(159,21,93,1) 28%,rgb(171 89 132) 100%,rgba(255,255,255,0) 100%);
        color: #fff;
        font-size: 14px;
        position: relative;
        margin-right: 20px;
        letter-spacing: 1.5px;
        font-weight: 600;

        &:hover,
        &.selected {
          background: #CC2D4A;
        }

        .goal-number {
           font-size: 10px;
           position: absolute;
           right: 20px;
           font-weight: 400;
        }
    }

          i {
           transition: all 0.1s;
           font-size: 14px;
           color: #BC1A6E;
           opacity: 0;
           cursor: pointer;
       }
    }
}


`;
