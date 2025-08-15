// pages/_app.js
import { Toaster } from "react-hot-toast";
import Layout from "@/app/layout";
import "../styles/globals.css";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Toaster position="top-center" reverseOrder={false} />
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
