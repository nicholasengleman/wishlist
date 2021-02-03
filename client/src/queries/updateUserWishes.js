import { gql } from '@apollo/client';

export default gql`
  mutation updateUserWishes($user_id: String!, $wishData: json!) {
    update_users_by_pk(
      pk_columns: { user_id: $user_id }
      _set: { wishData: $wishData }
    ) {
      user_id
      wishData
    }
  }
`;
