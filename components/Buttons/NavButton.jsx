import Link from 'next/link';
import { darken } from 'polished';
import Styled from 'styled-components';

import { Base } from './Base';

const Button = Styled(Base)`
  background-color: rgb(239, 239, 239);
  &:hover {
    background-color: ${darken(0.1, 'rgb(239, 239, 239)')};
  }
`;

export const NavButton = ({ href = '', onClick, children }) => {
  if (onClick) {
    return <Button onClick={() => onClick()}>{children}</Button>;
  }
  return (
    <Link href={href}>
      <Button>{children}</Button>
    </Link>
  );
};
