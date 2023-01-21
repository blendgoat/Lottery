import React, { useEffect } from "react";
import Header from "./Header";
import Lander from "./Home/Lander";
import { useAddress } from "@thirdweb-dev/react";
import Mainpage from "./Home/Mainpage";

// useEffect(() => {
//   if
// })

const Maincombine = ({ children }) => {
  const address = useAddress();

  return (
    <div>
      {address ? (
        <>
          <Header />
          {children}
        </>
      ) : (
        <Lander />
      )}
    </div>
  );
};

export default Maincombine;
