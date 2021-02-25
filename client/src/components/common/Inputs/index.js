import Styled from 'styled-components';

const InputBase = `
    width: 100%;
    padding: 10px 20px;
    border-radius: 10px;
    border: 1px solid lightblue;
    color: #444;
    height: 45px;
    background-color: whitesmoke;
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

export const Submit = Styled.input`
   ${InputBase};
   width: auto;
`;

export const Textarea = Styled.textarea`
   ${InputBase};
`;

export const Label = Styled.label`
 color: grey;
 margin: 10px 0;
 font-size: 14px;
 display: inline-box;
`;
