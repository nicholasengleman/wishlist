import Styled from 'styled-components';

export default Styled.div`
    h3 {
        font-size: 16px;
        letter-spacing: 2px;
        color: #BA3F1D;
        margin: 0 0 5px 30px;
    }

    .btn-add {
        border: none;
        width: none;
        font-size: 10px;
        color: #D81E5B;
        font-weight: 700;
        width: min-content;
        margin: 20px 0 0 15px;
        cursor: pointer;
    }

    .section-btn {
        background: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 8px;
        padding: 0 20px;
        border: none;
        cursor: pointer;
        transition: all 0.1s;
        width: 200px;
        position: relative;

        &:hover {
            background: #00C2FF;
            i {
                opacity: 1;
            }
        }

        .name {
         font-size: 20px;
        color: black;
        font-weight: 700;
        letter-spacing: 0.2px;
        font-weight: 700;
        }

        .goal-number {
           font-size: 14px;
           letter-spacing: 0.2px;
             color: #BA3F1D;
        }

       i {
           transition: all 0.1s;
           position: absolute;
           right: -30px;
           top: 8px;
           font-size: 12px;
           opacity: 0;
       }
    }
`;
