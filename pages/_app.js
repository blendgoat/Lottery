import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Maincombine from "../components/Maincombine";
import { ApeDaoProvider } from "../components/Context/solutions";
// This is the chainId your dApp will work on.
const activeChainId = ChainId.BinanceSmartChainTestnet;

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      // chainRpc={{
      //   [activeChainId]: "https://data-seed-prebsc-2-s3.binance.org:8545/",
      // }}
      desiredChainId={activeChainId}
    >
      <ApeDaoProvider>
        <Maincombine>
          <Component {...pageProps} />
        </Maincombine>
      </ApeDaoProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
