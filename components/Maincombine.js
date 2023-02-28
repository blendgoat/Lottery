import React, { useEffect, useContext, useState } from "react";
import Header from "./Header";
import Lander from "./Home/Lander";
import { useAddress, useNetworkMismatch } from "@thirdweb-dev/react";
import Mainpage from "./Home/Mainpage";
import { ApeDaoContext } from "./Context/solutions";
import Footert from "./Footert";

// useEffect(() => {
//   if
// })

const Maincombine = ({ children }) => {
  // const address = useAddress();
  const netMisMatch = useNetworkMismatch();
  console.log({ netMisMatch });

  const { address } = useContext(ApeDaoContext);

  const [isLoggedin, setIsLoggedin] = useState(false);

  // useEffect(() => {
  //   if (address) {
  //     setIsLoggedin(true);
  //   } else {
  //     setIsLoggedin(false);
  //   }
  // }, [address]);

  return (
    <div>
      {address ? (
        <>
          {netMisMatch == true && (
            <>
              <div>
                <h2>Please connect to Binance Smart Chain Testnet</h2>
                <p>
                  This dapp currently only works on the Binance Smart Chain
                  Testnet network, please switch networks in your connected
                  wallet.
                </p>
              </div>
            </>
          )}
          {netMisMatch == false && (
            <>
              <Header />
              {children}
              <Footert />
            </>
          )}
        </>
      ) : (
        <>
          <Lander />
        </>
      )}
    </div>
  );
};

export default Maincombine;
