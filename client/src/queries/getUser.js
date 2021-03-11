import { gql } from '@apollo/client';

export default gql`
  query getUser($user_id: String!) {
    users_by_pk(user_id: $user_id) {
      wishData
      name
      username
      avatarImg
      coverImg
    }
  }
`;
