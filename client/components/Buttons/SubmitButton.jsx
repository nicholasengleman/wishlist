import Styled from 'styled-components';
import { darken } from 'polished';
import { Base } from './Base';

export const SubmitButton = Styled(Base)`
 background-color: #0183FF;
 color: white;
 padding:
 i {
   position: absolute;
   right: 30px;
 }
  &:hover {
    background-color: ${darken(0.1, '#0183FF')};
  }
`;
