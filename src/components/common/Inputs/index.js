import Styled from 'styled-components';

const InputBase = `
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid lightgrey;
    color: #444;
    background-color: #fbfbfb;
    outline: none;
    transition: all 0.2s;
    box-sizing: border-box;
    &:focus {
        background-color: white;
        box-shadow: -5px 5px 10px #ccbfbf, 5px -5px 10px #fff9f9;
    }
`;

export const Input = Styled.input`
   ${InputBase};
`;

export const Textarea = Styled.textarea`
   ${InputBase};
`;
