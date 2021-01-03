import styled from 'styled-components';

const margin = ['0.5rem', '1rem', '2rem'];

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ marginSize }) => margin[marginSize]};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
`;

export const Column = styled.div`
  flex-direction: column;
  display: flex;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export default Row;
