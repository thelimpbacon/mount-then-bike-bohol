import { Head, Layout } from "@components/common";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@lib/apolloClient/client";
import { MatomoProvider, createInstance } from "@datapunt/matomo-tracker-react";
import "../styles/globals.css";
import "keen-slider/keen-slider.min.css";

const instance = createInstance({
  urlBase: "http://159.89.19.207/",
  siteId: 1,
});

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <>
      <Head />
      <ApolloProvider client={apolloClient}>
        <MatomoProvider value={instance}>
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </MatomoProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
