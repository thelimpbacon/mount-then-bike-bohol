import { initializeApollo } from "@lib/apolloClient/client";
import { GET_ALL_PRODUCTS, GET_PRODUCT } from "@lib/tags";
import { ProductType } from "utils/types/types";
import { ProductView } from "@components/common";
import { GetStaticPaths, GetStaticProps } from "next";

const Product = (props: ProductType) => {
  return <ProductView {...props} />;
};

export default Product;

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();
  const q = await apolloClient.query({ query: GET_ALL_PRODUCTS });
  const paths = q?.data?.getAllProducts.map((datum: { _id: string }) => {
    return { params: { pid: datum._id } };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const q = await apolloClient.query({
    query: GET_PRODUCT,
    variables: { _id: params.pid },
  });

  return {
    props: { ...q?.data?.getProduct },
    revalidate: 60,
  };
};
