import { gql } from '@apollo/client';

export default gql`
  query getUser($id: String!) {
    users_by_pk(id: $id) {
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
