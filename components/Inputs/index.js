import Styled from 'styled-components';

const InputBase = `
    width: 100%;
    padding: 3px 15px;
    border-radius: 7px;
    border: 2px solid #DFE8FF;
    color: #444;
    background-color: white;
    outline: none;
    transition: all 0.2s;
    box-sizing: border-box;
    font-size: 16px;
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
 color: #949494;
 margin-bottom: 3px;
 font-size: 14px;
 display: inline-box;
`;
