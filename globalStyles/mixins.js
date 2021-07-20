import device from './breakpoints';

export const pageWidth = () => `
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 10px;
    box-sizing: border-box;

    @media ${device.tablet} {
        padding: 0 50px;
    }
`;
