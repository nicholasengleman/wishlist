import Styled from 'styled-components';

export const H1 = Styled.h1`
  font-size: 24px;
  font-weight: 600;
`;

export const Paragraph = Styled.p`
  font-size: 16px;
  font-size: ${({ fontSize }) => fontSize};
`;
