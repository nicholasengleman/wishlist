import { gql } from '@apollo/client';

export default gql`
  query getProduct($id: uuid!) {
    products_by_pk(id: $id) {
      id
      name
      store
      description
      price
      likes
    }
  }
`;
