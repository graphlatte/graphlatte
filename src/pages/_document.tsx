import { seo } from "@/config/seo";
import Document, { Head, Html, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang={seo.lang}>
        <Head>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="description" content={seo.description} />
          <meta name="robots" content={seo.robots} />

          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:description" content={seo.description} />
          <meta property="twitter:domain" content={seo.url} />
          <meta property="twitter:image" content={seo.twitter.image} />
          <meta property="twitter:title" content={seo.twitter.title} />
          <meta property="twitter:url" content={seo.url} />

          {/* Open Graph */}
          <meta property="og:description" content={seo.description} />
          <meta property="og:image" content={seo.og.image} />
          <meta property="og:site_name" content={seo.siteName} />
          <meta property="og:title" content={seo.og.title} />
          <meta property="og:type" content={seo.og.type} />
          <meta property="og:url" content={seo.url} />

          <link rel="home" href={seo.url} />
          <link rel="canonical" href={seo.url} />

          {/* Inter */}
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
