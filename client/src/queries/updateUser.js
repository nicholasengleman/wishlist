import { gql } from '@apollo/client';

export default gql`
  mutation updateUser($user_id: String!, $data: users_set_input!) {
    update_users_by_pk(pk_columns: { user_id: $user_id }, _set: $data) {
      user_id
      username
      wishData
      avatarImg
    }
  }
`;
