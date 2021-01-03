import { gql } from '@apollo/client';

export default gql`
  query getTagProducts($name: String!) {
    tag(name: $name) {
      id
      name
      products {
        id
        name
        store
        price
        likes
      }
    }
  }
`;
