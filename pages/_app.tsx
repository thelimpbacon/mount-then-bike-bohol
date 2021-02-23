import { Head, Layout } from "@components/common";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@lib/apolloClient/client";
import "../styles/globals.css";
import "keen-slider/keen-slider.min.css";
import "../styles/rdu.css";

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <>
      <Head />
      <ApolloProvider client={apolloClient}>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
