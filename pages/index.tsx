import NextHead from "next/head";
import { initializeApollo } from "@lib/apolloClient/client";
import Link from "next/link";
import Image from "next/image";
import { TeaserCatalogue } from "@components/common";
import { GetStaticProps } from "next";
import { Bike, Chainset, Helmet } from "@components/common/Icons";
import { GET_ALL_PRODUCTS } from "@lib/tags";
import { seoImages } from "@lib/seoRelated/images";

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
      <meta property="og:image" content={seoImages.index} />
    </NextHead>
  );
};

const Home = ({ forFeatures }) => {
  return (
    <>
      <Header />
      <div className="lg:-mt-20">
        <div
          className="relative hidden w-screen lg:block"
          style={{ height: "55vh" }}
        >
          <Image
            className="object-contain object-top w-full h-auto max-h-full"
            alt="home image"
            src="https://res.cloudinary.com/mount-then-bike-bohol-admin-prod/image/upload/v1615652491/static/b04020bd-151a-4b78-857d-f9c27afb54e3-bannerfade.jpg.jpg"
            height={600}
            width={1000}
            layout="responsive"
            priority={true}
            quality="85"
          />
        </div>

        <div className="p-1 lg:mt-20 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/bikes">
              <a className="relative mx-4 my-2 overflow-hidden bg-white rounded-lg shadow-md lg:m-4 hover:shadow-lg hover:bg-gray-100">
                <div className="absolute right-0 z-10 px-1 bg-gray-500 shadow-md bg-opacity-30">
                  <Bike className="w-12 h-12 text-gray-200 lg:w-10 lg:h-10" />
                </div>
                <Image
                  className="object-cover w-full h-auto transition duration-500 ease-in-out transform rounded-t-lg hover:scale-105"
                  alt="Spare parts"
                  src={seoImages.bikes}
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
                  src={seoImages.parts}
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
                  src={seoImages.accessories}
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
    variables: {
      limit: 8,
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
