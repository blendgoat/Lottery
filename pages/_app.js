import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Maincombine from "../components/Maincombine";
import { ApeDaoProvider } from "./Context/solutions";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli;

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <ApeDaoProvider>
        <Maincombine>
          <Component {...pageProps} />
        </Maincombine>
      </ApeDaoProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
