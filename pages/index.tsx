import Banner from "@components/Banner";

export const picsUrl = [
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
    name: "4.jpg",
    url:
      "https://firebasestorage.googleapis.com/v0/b/mount-then-bike-bohol.appspot.com/o/4.jpg?alt=media&token=2da8d0d0-692d-4ce4-846a-1db29e37e7e3",
  },
  {
    name: "5.jpg",
    url:
      "https://firebasestorage.googleapis.com/v0/b/mount-then-bike-bohol.appspot.com/o/5.jpg?alt=media&token=96b779ec-6f89-4b60-b3ca-1f33c55acdfb",
  },
];

export const getStaticProps = async () => {
  return {
    props: {
      picsUrl,
    },
  };
};

export default function Home({ picsUrl }) {
  return <Banner picsUrl={picsUrl} />;
}
