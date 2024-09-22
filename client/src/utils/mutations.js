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
  mutation addProduct(
    $name: String!
    $price: Int!
    $description: String!
    $category: String!
    $quantity: Int!
    $image: String!
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
      image
      category
      quantity
    }
  }
`;
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $name: String!
    $price: Int!
    $description: String!
    $image: String!
    $category: String!
    $quantity: Int!
    $id: ID!
  ) {
    updateProduct(
      name: $name
      price: $price
      description: $description
      image: $image
      category: $category
      quantity: $quantity
      _id: $id
    ) {
      _id
      name
      price
      description
      image
      imageURL
      category
      quantity
    }
  }
`;
export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(_id: $id) {
      _id
      name
    }
  }
`;
export const ADD_REVIEW = gql`
  mutation AddReview($id: ID!, $reviewDetails: ReviewDetailsInput) {
    addReview(_id: $id, ReviewDetails: $reviewDetails) {
      _id
      name
      price
      description
      category
      quantity
      reviews {
        _id
        username
        content
        rating
      }
    }
  }
`;
