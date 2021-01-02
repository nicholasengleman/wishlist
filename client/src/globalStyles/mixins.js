import { lighten } from 'polished';
import device from './breakpoints';

export const pageWidth = () => `
    width: 100%;
    max-width: 1550px;
    margin: 0 auto;
    padding: 0 10px;

    @media ${device.tablet} {
        padding: 0 50px;
    }
`;

export const buttonColor = () => `
    background-color:#dedfe0;
    transition: all 0.2s;
    &:hover {
       background-color: ${lighten(0.15, '#dedfe0')}
    }
`;
