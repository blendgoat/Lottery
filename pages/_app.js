import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Maincombine from "../components/Maincombine";
import { ApeDaoProvider } from "../components/Context/solutions";
// This is the chainId your dApp will work on.
const activeChainId = ChainId.BinanceSmartChainTestnet;

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      chainRpc={{
        [ChainId.BinanceSmartChainTestnet]:
          "https://nd-764-677-613.p2pify.com/28787a475356e4577cff82f01fee0326",
      }}
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
