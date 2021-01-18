import Styled from 'styled-components';

const InputBase = `
    width: 100%;
    padding: 10px 20px;
    border-radius: 10px;
    border: none;
    color: #444;
    height: 45px;
    background-color: #00FFFF;
    outline: none;
    transition: all 0.2s;
    box-sizing: border-box;
    font-size: 18px;
    &:focus {
        background-color: white;
        box-shadow: -1px 1px 3px #ccbfbf, 1px -1px 3px #fff9f9;
    }
`;

export const Input = Styled.input`
   ${InputBase};
`;

export const Textarea = Styled.textarea`
   ${InputBase};
`;
