import NextHead from "next/head";
import { initializeApollo } from "@lib/apolloClient/client";
import Link from "next/link";
import Image from "next/image";
import { TeaserCatalogue } from "@components/common";
import { GetStaticProps } from "next";
import { Bike, Chainset, Helmet } from "@components/common/Icons";
import { GET_ALL_PRODUCTS } from "@lib/tags";

const IMAGES = {
  banner:
    "https://res.cloudinary.com/mount-then-bike-bohol/image/upload/v1614975213/static/d434302a-4b16-4f89-9c38-899b7e1ca830-145893362_211016557381567_321366468149861339_o.jpg.jpg",
  bicycles:
    "https://res.cloudinary.com/mount-then-bike-bohol/image/upload/v1614095439/58a1531e-aae2-4ba3-8a97-f9e14800cecc-145954138_211015874048302_9193158913903812545_o.jpg.jpg",
  parts:
    "https://res.cloudinary.com/mount-then-bike-bohol/image/upload/v1614095448/static/70f2ab11-bc17-4b2c-8944-0b5d359b7730-145896986_211016100714946_2013226482598011937_o.jpg.jpg",
  accessories:
    "https://res.cloudinary.com/mount-then-bike-bohol/image/upload/v1615023560/static/pexels-photo-1619299_xbvywu.jpg",
};

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
        content="https://res.cloudinary.com/mount-then-bike-bohol/image/upload/v1614095442/static/d434302a-4b16-4f89-9c38-899b7e1ca830-145893362_211016557381567_321366468149861339_o.jpg.jpg"
      />
    </NextHead>
  );
};

const Home = ({ forFeatures }) => {
  return (
    <>
      <Header />
      <div className="">
        <div className="hidden w-full overflow-hidden shadow-2xl lg:block lg:absolute lg:-top-80">
          <Image
            className="object-cover w-full h-auto max-h-full"
            alt="home image"
            src={IMAGES.banner}
            height={600}
            width={1000}
            layout="responsive"
            priority={true}
            quality="85"
          />
        </div>

        <div className="p-1 md:p-6 md:relative lg:mt-96 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/bikes">
              <a className="relative mx-4 my-2 overflow-hidden bg-white rounded-lg shadow-md lg:m-4 hover:shadow-lg hover:bg-gray-100">
                <div className="absolute right-0 z-10 px-1 bg-gray-500 shadow-md bg-opacity-30">
                  <Bike className="w-12 h-12 text-gray-200 lg:w-10 lg:h-10" />
                </div>
                <Image
                  className="object-cover w-full h-auto transition duration-500 ease-in-out transform rounded-t-lg hover:scale-105"
                  alt="Spare parts"
                  src={IMAGES.bicycles}
                  height={200}
                  width={300}
                  layout="responsive"
                  quality="85"
                />
                <div className="px-4 py-2 bg-gradient-to-br from-indigo-300 to-indigo-50">
                  <h3 className="my-2 text-xl font-medium text-gray-700 uppercase ">
                    Bicycles
                  </h3>
                </div>
              </a>
            </Link>
            <Link href="/parts">
              <a className="relative mx-4 my-2 overflow-hidden bg-white rounded-lg shadow-md lg:m-4 hover:shadow-lg hover:bg-gray-100">
                <div className="absolute right-0 z-10 px-1 bg-gray-500 shadow-md bg-opacity-30">
                  <Chainset className="w-12 h-12 text-gray-200 lg:w-10 lg:h-10" />
                </div>
                <Image
                  className="object-cover w-full h-auto transition duration-500 ease-in-out transform rounded-t-lg hover:scale-105"
                  alt="Spare parts"
                  src={IMAGES.parts}
                  height={200}
                  width={300}
                  layout="responsive"
                  quality="85"
                />
                <div className="px-4 py-2 from-purple-200 bg-gradient-to-br to-purple-50">
                  <h3 className="my-2 text-xl font-medium text-gray-700 uppercase ">
                    Parts
                  </h3>
                </div>
              </a>
            </Link>
            <Link href="/accessories">
              <a className="relative mx-4 my-2 overflow-hidden bg-white rounded-lg shadow-md lg:m-4 hover:shadow-lg hover:bg-gray-100">
                <div className="absolute right-0 z-10 px-1 bg-gray-500 shadow-md bg-opacity-30">
                  <Helmet className="w-12 h-12 text-gray-200 lg:w-10 lg:h-10" />
                </div>
                <Image
                  className="object-cover w-full h-auto transition duration-500 ease-in-out transform rounded-t-lg hover:scale-105 "
                  alt="Spare parts"
                  src={IMAGES.accessories}
                  height={200}
                  width={300}
                  layout="responsive"
                  quality="85"
                />
                <div className="px-4 py-2 from-pink-200 bg-gradient-to-br to-pink-50">
                  <h3 className="my-2 text-xl font-medium text-gray-700 uppercase ">
                    Accessories
                  </h3>
                </div>
              </a>
            </Link>
          </div>

          <h3 className="mt-5 mb-1 text-2xl text-center lg:mb-0 lg:text-left lg:ml-4">
            More to discover
          </h3>

          <TeaserCatalogue products={forFeatures} />
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_ALL_PRODUCTS,
    variable: {
      limit: 1,
    },
  });

  return {
    props: {
      forFeatures: data.getAllProducts,
    },
    revalidate: 600,
  };
};

export default Home;
