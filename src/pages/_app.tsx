// import '@/styles/globals.css'
import Head from "next/head";
import type { AppProps } from 'next/app'
// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'
// own css files here
import "../css/customcss.css";
import "../css/javascriptfiltercss.css";
// import "bootstrap/dist/js/bootstrap"
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("node_modules/bootstrap/dist/js/bootstrap");
  }, [])
  return <>
  <Head>
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.2/build/styles/default.min.css"></link>
 </Head>
<Component {...pageProps} />
</>
}
