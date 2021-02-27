import { Head, Layout } from "@components/common";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@lib/apolloClient/client";
import { Provider as NextAuthProvider } from "next-auth/client";
import "../styles/globals.css";
import "keen-slider/keen-slider.min.css";
import "../styles/rdu.css";

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <>
      <Head />
      <ApolloProvider client={apolloClient}>
        <NextAuthProvider session={pageProps.session}>
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </NextAuthProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
