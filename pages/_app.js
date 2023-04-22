import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Maincombine from "../components/Maincombine";
import { ApeDaoProvider } from "../components/Context/solutions";
import Head from "next/head";

// This is the chainId your dApp will work on.
// const activeChainId = ChainId.BinanceSmartChainTestnet;

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain="binance">
      <ApeDaoProvider>
        <Head>
          <title>The Game DAO</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="preconnect" href="https://thegamedao.com" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Maincombine>
          <Component {...pageProps} />
        </Maincombine>
      </ApeDaoProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
