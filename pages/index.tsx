import NextHead from "next/head";
import { initializeApollo } from "@lib/apolloClient/client";
import Banner from "@components/Banner";
import { TeaserCatalogue } from "@components/common";
import { GET_ALL_BIKES_AND_ACCESORIES } from "@lib/tags";
import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <NextHead>
      <meta property="og:title" content="Mount, then Bike Bohol" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}`} />
      <meta
        property="og:description"
        content="The newest and most affordable bikes available on the market have
            invaded Bohol."
      />
      <meta
        property="og:image"
        content="https://res.cloudinary.com/mount-then-bike-bohol/image/upload/v1614095442/d434302a-4b16-4f89-9c38-899b7e1ca830-145893362_211016557381567_321366468149861339_o.jpg.jpg"
      />
    </NextHead>
  );
};

const Home = ({ forBikes, forAccessories }) => {
  return (
    <>
      <Header />
      <div className="md:relative -top-52">
        <div className="hidden overflow-hidden shadow-md md:block">
          <Image
            className="object-cover w-full h-auto max-h-full"
            alt="home image"
            src="https://res.cloudinary.com/mount-then-bike-bohol/image/upload/v1614095442/d434302a-4b16-4f89-9c38-899b7e1ca830-145893362_211016557381567_321366468149861339_o.jpg.jpg"
            height={600}
            width={1000}
            layout="responsive"
            priority={true}
            quality="85"
          />
        </div>
        <div className="p-1 md:p-6">
          <Link href="/bikes">
            <a>
              <div className="text-2xl ">Our bikes</div>
            </a>
          </Link>
          <TeaserCatalogue products={forBikes} />
        </div>
        <div className="p-1 md:p-6">
          <Link href="/accesories">
            <a>
              <div className="text-2xl ">Our accesories</div>
            </a>
          </Link>
          <TeaserCatalogue products={forAccessories} />
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_ALL_BIKES_AND_ACCESORIES,
  });

  return {
    props: {
      forBikes: data.getAllBikes,
      forAccessories: data.getAllAccesories,
    },
    revalidate: 600,
  };
};

export default Home;
