import { gql } from '@apollo/client';

export default gql`
  query getUser($user_id: String!) {
    users_by_pk(user_id: $user_id) {
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
