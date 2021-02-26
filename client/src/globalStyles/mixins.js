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
    transition: all 0.2s ease-in-out;
    &:hover {
       color: #2f2f2f;
       background-color: #DCE7F9;
    }
`;
