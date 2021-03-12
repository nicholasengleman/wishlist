import Styled from 'styled-components';

export const H1 = Styled.h1`
  font-size: 24px;
  font-weight: 600;
`;

export const H3 = Styled.h3`
  font-size: 20px;
  font-weight: 600;
`;

export const Description = Styled.p`
  font-size: 12px;
  font-size: ${({ fontSize }) => fontSize};
  font-style: italic;
`;

export const Paragraph = Styled.p`
  font-size: 16px;
  font-size: ${({ fontSize }) => fontSize};
`;
