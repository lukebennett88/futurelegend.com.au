import * as React from "react";
import { ApolloProvider } from "@apollo/client";

import { Layout } from "@components/layout";
import { apolloClient } from "@utils/apollo-client";
import "../styles/globals.css";

interface AppProps {
  Component: React.FC;
  pageProps: Record<string, unknown>;
}

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default App;
