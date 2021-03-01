import { initializeApollo } from "@lib/apolloClient/client";
import { TeaserCatalogue } from "@components/common";
import { GET_ALL_ACCESORIES } from "@lib/tags";
import { GetStaticProps } from "next";

const Home = ({ forAccessories }) => {
  return (
    <div className="lg:min-h-screen">
      <div className="p-1 md:p-6">
        <div className="text-2xl ">Our accesories</div>
        <TeaserCatalogue products={forAccessories} />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_ALL_ACCESORIES,
  });

  return {
    props: {
      forAccessories: data.getAllAccesories,
    },
    revalidate: 600,
  };
};

export default Home;
