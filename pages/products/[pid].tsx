import NextHead from "next/head";
import DefaultErrorPage from "next/error";
import { useRouter } from "next/router";
import { initializeApollo } from "@lib/apolloClient/client";
import { GET_ALL_PRODUCTS, GET_PRODUCT } from "@lib/tags";
import { ProductType } from "utils/types/types";
import { ProductView } from "@components/common";
import { GetStaticPaths, GetStaticProps } from "next";

const Product = (props: ProductType) => {
  const router = useRouter();
  if (router.isFallback) {
    // needs a proper loading comp
    return <div className="h-screen p-10">"Loading product"</div>;
  }

  // This includes setting the noindex header because static files always return
  // a status 200 but the rendered not found page page should obviously not be indexed
  if (!props._id) {
    return (
      <>
        <NextHead>
          <meta name="robots" content="noindex" />
        </NextHead>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  return <ProductView {...props} />;
};

export default Product;

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();
  const q = await apolloClient.query({ query: GET_ALL_PRODUCTS });

  return {
    paths: q.data.getAllProducts.map((datum: { _id: string }) => {
      return { params: { pid: datum._id } };
    }),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  const q = await apolloClient.query({
    query: GET_PRODUCT,
    variables: { _id: params.pid },
  });

  return {
    props: { ...q.data.getProduct },
    revalidate: 400,
  };
};
