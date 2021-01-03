import { gql } from '@apollo/client';

export default gql`
  query MyQuery {
    products {
      copies
      creatorId
      description
      id
      likes
      name
      price
      store
      tagId
    }
  }
`;
