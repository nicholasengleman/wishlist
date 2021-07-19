import Styled from 'styled-components';
import { darken } from 'polished';
import { Base } from './Base';

export const CancelButton = Styled(Base)`
 background-color: white;
 color: black;
 i {
   position: absolute;
   right: 30px;
 }
  /* &:hover {
    background-color: ${darken(0.1, '#0183FF')};
  } */
`;
