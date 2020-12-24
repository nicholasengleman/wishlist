import Styled from 'styled-components';

const Paragraph = Styled.p`
  font-size: 16px;
  font-size: ${({ fontSize }) => fontSize};
`;

export default Paragraph;
