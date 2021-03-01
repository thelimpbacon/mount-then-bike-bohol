import NextHead from "next/head";
import { initializeApollo } from "@lib/apolloClient/client";
import Banner from "@components/Banner";
import { TeaserCatalogue } from "@components/common";
import { GET_ALL_BIKES } from "@lib/tags";
import { GetStaticProps } from "next";

const Header = () => {
  return (
    <NextHead>
      <meta property="og:title" content="Bikes by Mount, then Bike Bohol" />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_SITE_URL}/bikes`}
      />
      <meta
        property="og:description"
        content="The newest and most affordable bikes available on the market have
          invaded Bohol."
      />
      <meta
        property="og:image"
        content="https://res.cloudinary.com/mount-then-bike-bohol/image/upload/v1614095451/8f45d107-c9bf-41e6-ada9-be0ccd34b006-145835548_211014310715125_5210714344076590716_o.jpg.jpg"
      />
    </NextHead>
  );
};

const Bikes = ({ forBikes }) => {
  return (
    <>
      <Header />
      <div className="lg:min-h-screen">
        <div className="p-1 md:p-6">
          <div className="text-2xl ">Our bikes</div>
          <TeaserCatalogue products={forBikes} />
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_ALL_BIKES,
  });

  return {
    props: {
      forBikes: data.getAllBikes,
    },
    revalidate: 600,
  };
};

export default Bikes;
