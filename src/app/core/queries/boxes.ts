import { gql } from "apollo-angular";

export const GET_BOXES = (free: boolean = false, purchasable: boolean = true, openable: boolean = true) => gql`
  query {
    boxes(free: ${free}, purchasable: ${purchasable}, openable: ${openable}) {
    edges {
      node {
          id
          name
          iconUrl
          cost
        }
      }
    }
  }
`;

export const OPEN_BOX_MUTATION = gql`
  mutation OpenBox($input: OpenBoxInput!) {
    openBox(input: $input) {
      boxOpenings {
        id
        boxId
        itemVariant {
          id
          name
          value
        }
      }
    }
  }
`
