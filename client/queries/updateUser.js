import { gql } from '@apollo/client';

export default gql`
  mutation updateUser($id: String!, $data: users_set_input!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: $data) {
      name
      created_at
      last_seen
      wishData
      username
      id
      avatarImg
      coverImg
      coverImgPosition
      location
      bio
    }
  }
`;
