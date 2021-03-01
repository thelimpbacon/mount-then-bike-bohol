import NextHead from "next/head";
import { initializeApollo } from "@lib/apolloClient/client";
import { TeaserCatalogue } from "@components/common";
import { GET_ALL_ACCESORIES } from "@lib/tags";
import { GetStaticProps } from "next";

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
      <meta
        property="og:image"
        content="https://res.cloudinary.com/mount-then-bike-bohol/image/upload/v1614095448/70f2ab11-bc17-4b2c-8944-0b5d359b7730-145896986_211016100714946_2013226482598011937_o.jpg.jpg"
      />
    </NextHead>
  );
};

const Home = ({ forAccessories }) => {
  return (
    <>
      <Header />
      <div className="lg:min-h-screen">
        <div className="p-1 md:p-6">
          <div className="text-2xl ">Our accesories</div>
          <TeaserCatalogue products={forAccessories} />
        </div>
      </div>
    </>
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
