import { gql } from "@apollo/client";

export const GET_ME = gql`
  query Me {
    me {
      username
      password
      email
      _id
    }
  }
`;

export const GET_All_PRODUCTS = gql`
  query products {
    products {
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

export const GET_SINGLE_PRODUCT = gql`
  query singleProduct($productId: ID!) {
    singleProduct(productId: $productId) {
      _id
      name
      price
      description
      image
      imageURL
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

export const GET_INFO = gql`
  query Info {
    info {
      announcementTitle
      announcement
      about1Title
      about1Text
      about2Title
      about2Text
    }
  }
`;
