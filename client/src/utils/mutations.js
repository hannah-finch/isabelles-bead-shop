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
    $stock: Int!
    $image: String!
  ) {
    createProduct(
      name: $name
      price: $price
      description: $description
      category: $category
      stock: $stock
      image: $image
    ) {
      _id
      name
      price
      description
      image
      category
      stock
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
    $stock: Int!
    $id: ID!
  ) {
    updateProduct(
      name: $name
      price: $price
      description: $description
      image: $image
      category: $category
      stock: $stock
      _id: $id
    ) {
      _id
      name
      price
      description
      image
      imageURL
      category
      stock
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
      stock
      reviews {
        _id
        username
        content
        rating
      }
    }
  }
`;

export const UPDATE_STOCK = gql`
  mutation UpdateStock($products: [UpdateStockInput!]!) {
    updateStock(products: $products)
  }
`;

export const UPDATE_INFO = gql`
  mutation UpdateInfo($announcement: String, $about1Title: String, $about1Text: String, $about2Title: String, $about2Text: String) {
    updateInfo(announcement: $announcement, about1Title: $about1Title, about1Text: $about1Text, about2Title: $about2Title, about2Text: $about2Text) {
      announcement
      about1Title
      about1Text
      about2Title
      about2Text
    }
  }
`;