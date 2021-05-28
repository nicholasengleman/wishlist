import Styled from 'styled-components';
import { useUser } from '@auth0/nextjs-auth0';
import { darken } from 'polished';

import { Base } from './Base';

const StyledEditButton = Styled(Base)`
 background-color: #2ACA9A;
 color: white;
  &:hover {
    background-color: ${darken(0.1, '#2ACA9A')};
  }
`;

export const EditButton = (props) => {
  const { user, error, isLoading } = useUser();

  if (!user) {
    return null;
  }

  return (
    <StyledEditButton {...props} onClick={props.onClick}>
      {props.children}
    </StyledEditButton>
  );
};
