import Styled from 'styled-components';

const InputBase = `
    width: 100%;
    padding: 5px 20px;
    border-radius: 10px;
    border: 1px solid lightblue;
    color: #444;
    background-color: #F7F8FB;
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

export const Form = Styled.form`
    width: 100%;
`;

export const Label = Styled.label`
 color: grey;
 margin-bottom: 5px;
 font-size: 14px;
 display: inline-box;
`;
