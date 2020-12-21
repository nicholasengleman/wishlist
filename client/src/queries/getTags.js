
import { gql } from "@apollo/client";

export default gql`
  query getTags {
    tags {
      id
      name
    }
  }
`;