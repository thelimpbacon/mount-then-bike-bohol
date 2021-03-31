import NextHead from "next/head";
import { initializeApollo } from "@lib/apolloClient/client";
import { TeaserCatalogue } from "@components/common";
import { GET_TYPE } from "@lib/tags";
import { GetStaticProps } from "next";
import { seoImages } from "@lib/seoRelated/images";
import { useMatomo } from "@datapunt/matomo-tracker-react";
import { useEffect } from "react";

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
      <meta property="og:image" content={seoImages.parts} />
    </NextHead>
  );
};

const Parts = ({ forParts }) => {
  const { trackPageView } = useMatomo();
  useEffect(() => {
    trackPageView({});
  }, []);
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <div className="p-1 md:p-6">
          <div className="text-2xl ">Our Parts</div>
          <TeaserCatalogue products={forParts} />
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
      type: "Parts",
    },
  });

  return {
    props: {
      forParts: data.getType,
    },
    revalidate: 400,
  };
};

export default Parts;
