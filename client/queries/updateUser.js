import { gql } from '@apollo/client';

export default gql`
  mutation updateUser($user_id: String!, $data: users_set_input!) {
    update_users_by_pk(pk_columns: { user_id: $user_id }, _set: $data) {
      name
      created_at
      last_seen
      wishData
      username
      user_id
      avatarImg
      coverImg
      coverImgPosition
      location
      bio
    }
  }
`;
