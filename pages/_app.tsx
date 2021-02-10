import { Head, Layout } from "@components/common";
import "../styles/globals.css";
import "keen-slider/keen-slider.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head />
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
