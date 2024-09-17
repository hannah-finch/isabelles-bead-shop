import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
query ExampleQuery {
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

