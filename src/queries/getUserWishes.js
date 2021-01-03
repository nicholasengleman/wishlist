import { gql } from '@apollo/client';

export default gql`
  query getUserData($userId: uuid!) {
    users_by_pk(userId: $userId) {
      wishData
    }
  }
`;
