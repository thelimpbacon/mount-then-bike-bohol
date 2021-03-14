import { gql } from "@apollo/client";

//query
export const GET_PRODUCT = gql`
  query getProduct($_id: ID!) {
    getProduct(_id: $_id) {
      _id
      name
      price
      description
      type
      mainImage {
        public_id
        url
        filename
      }
      secondaryImage {
        public_id
        url
        filename
      }
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query getAllProducts($limit: Int) {
    getAllProducts(limit: $limit) {
      _id
      name
      type
      mainImage {
        public_id
        url
        filename
      }
    }
  }
`;
export const GET_TYPE = gql`
  query getType($type: String!, $limit: Int) {
    getType(type: $type, limit: $limit) {
      _id
      name
      type
      mainImage {
        public_id
        url
        filename
      }
    }
  }
`;

export const SEARCH_PRODUCTS = gql`
  query searchProducts($searchString: String) {
    searchProducts(searchString: $searchString) {
      _id
      name
      type
      description
      mainImage {
        public_id
        url
        filename
      }
      highlights {
        name {
          value
          type
        }
        type {
          value
          type
        }
      }
    }
  }
`;
