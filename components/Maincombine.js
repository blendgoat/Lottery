import React from "react";

import { useNetworkMismatch } from "@thirdweb-dev/react";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Maincombine = ({ children }) => {
  const netMisMatch = useNetworkMismatch();
  return (
    <div>
      <>
        {netMisMatch == true && (
          <>
            <div className="flex items-center justify-center h-screen w-screen">
              <div>Please connect to Binance Smart Chain. This dapp currently only works on the Binance Smart Chain network, please switch networks in your connected wallet.</div>
            </div>
          </>
        )}
        {netMisMatch == false && (
          <>
            <div className="bg-primary-black overflow-hidden">
              <Navbar />
              {children}
              <div className="bg-primary-black overflow-hidden">
                <Footer />
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default Maincombine;
