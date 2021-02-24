import { initializeApollo } from "@lib/apolloClient/client";
import Banner from "@components/Banner";
import { TeaserCatalogue } from "@components/common";
import { GET_ALL_BIKES_AND_ACCESORIES } from "@lib/tags";
import { GetStaticProps } from "next";

export const forBanner = [
  {
    name: "4.jpg",
    url:
      "https://firebasestorage.googleapis.com/v0/b/mount-then-bike-bohol.appspot.com/o/4.jpg?alt=media&token=2da8d0d0-692d-4ce4-846a-1db29e37e7e3",
    // "https://mount-then-bike-bohol.s3-ap-southeast-1.amazonaws.com/38d07589-e082-4ce2-b95d-c9e0fc2ad134-WhatsAppImage2020-04-12at09.57.09.jpeg",
  },
  {
    name: "1.jpg",
    url:
      "https://firebasestorage.googleapis.com/v0/b/mount-then-bike-bohol.appspot.com/o/1.jpg?alt=media&token=d1ec9986-8591-4bc5-aad5-eaa9f2394a77",
  },
  {
    name: "2.jpg",
    url:
      "https://firebasestorage.googleapis.com/v0/b/mount-then-bike-bohol.appspot.com/o/2.jpg?alt=media&token=e4ff9de1-0a5c-4e51-b884-d0693e550875",
  },
  {
    name: "3.jpg",
    url:
      "https://firebasestorage.googleapis.com/v0/b/mount-then-bike-bohol.appspot.com/o/3.jpg?alt=media&token=1c2f3ba7-0bbb-4354-bf47-dfcfe94a1c1e",
  },
  {
    name: "5.jpg",
    url:
      "https://firebasestorage.googleapis.com/v0/b/mount-then-bike-bohol.appspot.com/o/5.jpg?alt=media&token=96b779ec-6f89-4b60-b3ca-1f33c55acdfb",
  },
];

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_ALL_BIKES_AND_ACCESORIES,
  });

  return {
    props: {
      forBanner,
      forBikes: data.getAllBikes || [],
      forAccessories: data.getAllAccesories || [],
    },
  };
};

export default function Home({ forBanner, forBikes, forAccessories }) {
  return (
    <div className="md:relative -top-32">
      <Banner picsUrl={forBanner} />
      <div className="p-1 md:p-6">
        <div className="text-2xl ">Our bikes</div>
        <TeaserCatalogue products={forBikes} />
      </div>
      <div className="p-1 md:p-6">
        <div className="text-2xl ">Our accesories</div>
        <TeaserCatalogue products={forAccessories} />
      </div>
    </div>
  );
}
