import { lighten } from 'polished';

export const pageWidth = () => `
    width: 100%;
    max-width: 1250px;
    padding: 0 50px;
    margin: 0 auto;
`;

export const buttonColor = () => `
    background-color:#dedfe0;
    transition: all 0.2s;
    &:hover {
       background-color: ${lighten(0.15, '#dedfe0')}
    }
`;
