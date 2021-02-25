import styled from 'styled-components';

const margin = ['0.5rem', '1rem', '2rem', '3rem'];

export const Row = styled.div`
  margin: 0.25rem 0.5rem;
  display: flex;
  align-items: center;
  margin-bottom: ${({ marginSize }) => margin[marginSize]};
  margin-top: ${({ marginSize }) => margin[marginSize - 1]};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
`;

export const Column = styled.div`
  flex-direction: column;
  display: flex;
  width: 100%;
  margin: 0 0.5rem;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-left: ${({ marginSize }) => margin[marginSize]};
`;

export default Row;
