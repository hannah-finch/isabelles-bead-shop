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
