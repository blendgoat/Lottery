import React, { useEffect, useContext, useState } from "react";
import Header from "./Header";
import Lander from "./Home/Lander";
import { useAddress } from "@thirdweb-dev/react";
import Mainpage from "./Home/Mainpage";
import { ApeDaoContext } from "./Context/solutions";

// useEffect(() => {
//   if
// })

const Maincombine = ({ children }) => {
  // const address = useAddress();

  const { address } = useContext(ApeDaoContext);

  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    if (address) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }
  }, [address]);

  return (
    <div>
      {address ? (
        <>
          <Header />
          {children}
        </>
      ) : (
        <>
          <Lander />
          {children}
        </>
      )}
    </div>
  );
};

export default Maincombine;
