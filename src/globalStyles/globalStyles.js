import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
  ${reset};
  a {
    text-decoration: none;
    color: inherit;
  }
`;
