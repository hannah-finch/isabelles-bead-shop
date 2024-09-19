import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation ADD_PRODUCT(
    $name: String!
    $price: Int!
    $description: String!
    $category: String!
    $quantity: Int!
    $image: ImageDetailsInput
  ) {
    createProduct(
      name: $name
      price: $price
      description: $description
      category: $category
      quantity: $quantity
      image: $image
    ) {
      _id
      name
      price
      description
      image {
        name
        id
        description
        Url
      }
      category
      quantity
    }
  }
`;
