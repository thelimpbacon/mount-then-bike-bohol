import { initializeApollo } from "@lib/apolloClient/client";
import Banner from "@components/Banner";
import { TeaserCatalogue } from "@components/common";
import { GET_ALL_BIKES } from "@lib/tags";
import { GetStaticProps } from "next";

const Bikes = ({ forBikes }) => {
  return (
    <div className="lg:min-h-screen">
      <div className="p-1 md:p-6">
        <div className="text-2xl ">Our bikes</div>
        <TeaserCatalogue products={forBikes} />
      </div>
    </div>
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
