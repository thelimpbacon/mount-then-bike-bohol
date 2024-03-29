import NextHead from "next/head";

const Head = () => {
  return (
    <NextHead>
      <title>Mount, then bike Bohol</title>
      <meta
        name="description"
        content="We just don't build project bikes. We narrate your awesome biking
        experience."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link rel="manifest" href="/" key="site-manifest" />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="author" content="Vaughn Dalde" />
      <meta
        name="google-site-verification"
        content="l8Jl2gs8ukjS1B3LXklNTLSAp6pjd3sX2HXTSLLEvDE"
      />
    </NextHead>
  );
};

export default Head;
