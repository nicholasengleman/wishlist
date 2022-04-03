import styled from 'styled-components';
import { pageWidth } from 'globalStyles/mixins';

const margin = ['0', '0.5rem', '1rem', '2rem', '3rem'];

export const Row = styled.div`
  display: flex;
  margin-bottom: 1rem;
  margin-bottom: ${({ marginSize }) => margin[marginSize]};
  margin: ${({ margin }) => margin};
  gap: ${({ gap }) => (gap ? gap : '1rem')};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};
  justify-content: ${({ justifyContent }) => justifyContent};
  width: ${({ width }) => (width ? width : '100%')};
  ${({ container }) => container && pageWidth()};
`;

export const Column = styled.div`
  flex-direction: column;
  display: flex;
  width: ${({ width }) => (width ? width : '100%')};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-wrap: ${({ flexWrap }) => flexWrap};
  justify-content: flex-start;
  margin-left: ${({ marginSize }) => margin[marginSize]};
  width: ${(props) => props.width};
  gap: ${(props) => props.gap};
`;

export default Row;
