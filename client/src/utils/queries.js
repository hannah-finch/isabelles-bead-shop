import { gql } from "@apollo/client";

export const GET_All_PRODUCTS = gql`
  query products {
    products {
      _id
      name
      price
      description
      image {
        id
        Url
        name
        description
      }
      category
      quantity
    }
  }
`;
