import { gql } from '@apollo/client';

export default gql`
  mutation InsertUser($id: String!, $username: String!) {
    insert_users_one(object: { user_id: $id, username: $username }) {
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
