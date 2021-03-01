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
  query getAllProducts {
    getAllProducts {
      _id
    }
  }
`;

export const GET_ALL_BIKES_AND_ACCESORIES = gql`
  query getAllBikesAndAccesories {
    getAllBikes {
      _id
      name
      mainImage {
        public_id
        url
        filename
      }
    }
    getAllAccesories {
      _id
      name
      mainImage {
        public_id
        url
        filename
      }
    }
  }
`;

export const GET_ALL_ACCESORIES = gql`
  query getAllAccesories {
    getAllAccesories {
      _id
      name
      mainImage {
        public_id
        url
        filename
      }
    }
  }
`;

export const GET_ALL_BIKES = gql`
  query getAllBikes {
    getAllBikes {
      _id
      name
      mainImage {
        public_id
        url
        filename
      }
    }
  }
`;
