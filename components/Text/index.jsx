import Styled from 'styled-components';
import { font } from '/globalStyles/mixins';

const margin = ['0', '0.5rem', '1rem', '2rem', '3rem'];

export const H1 = Styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #023047;
  color: ${({ color }) => color};
  ${font};
`;

export const H3 = Styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #023047;
  color: ${({ color }) => color};
   ${font};
`;

export const Description = Styled.p`
  font-size: 12px;
  font-size: ${({ fontSize }) => fontSize};
  font-style: italic;
  color: #023047;
  color: ${({ color }) => color};
  ${font};
`;

export const Paragraph = Styled.p`
  font-size: 16px;
  font-size: ${({ fontSize }) => fontSize};
  color: #023047;
  color: ${({ color }) => color};
  margin-bottom: ${({ marginSize }) => margin[marginSize]};
  ${font};
`;
