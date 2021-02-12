import { gql } from "@apollo/client";

// mutation
export const ADD_PRODUCT = gql`
  mutation addProduct($input: ProductInput) {
    addProduct(input: $input)
  }
`;
