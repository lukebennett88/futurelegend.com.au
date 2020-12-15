import * as React from "react";

import { Layout } from "../components/layout";
import "../styles/globals.css";

interface AppProps {
  Component: React.FC;
  pageProps: Record<string, unknown>;
}

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default App;
