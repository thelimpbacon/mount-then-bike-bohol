import NextHead from "next/head";
import { initializeApollo } from "@lib/apolloClient/client";
import { TeaserCatalogue } from "@components/common";
import { GET_TYPE } from "@lib/tags";
import { GetStaticProps } from "next";
import { seoImages } from "@lib/seoRelated/images";

const Header = () => {
  return (
    <NextHead>
      <meta
        property="og:title"
        content="Accesories by Mount, then Bike Bohol"
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_SITE_URL}/accesories`}
      />
      <meta
        property="og:description"
        content="The newest and most affordable bikes available on the market have
            invaded Bohol."
      />
      <meta property="og:image" content={seoImages.accessories} />
    </NextHead>
  );
};

const Home = ({ forAccessories }) => {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <div className="p-1 md:p-6">
          <div className="text-2xl ">Our accessories</div>
          <TeaserCatalogue products={forAccessories} />
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_TYPE,
    variables: {
      type: "Accessories",
    },
  });

  return {
    props: {
      forAccessories: data.getType,
    },
    revalidate: 400,
  };
};

export default Home;
