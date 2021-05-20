import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
  ${reset};
  body {
    background-color: #EDEEF4;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;
