import { gql } from '@apollo/client';

export default gql`
  mutation updateUserWishes($userId: uuid!, $wishData: json!) {
    update_users_by_pk(
      pk_columns: { userId: $userId }
      _set: { wishData: $wishData }
    ) {
      userId
      wishData
    }
  }
`;
