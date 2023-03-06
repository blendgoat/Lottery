import { useState, useContext } from "react";

import Daocompo from "../components/Daocompo";
import Mintcompo from "../components/Mintcompo";
import { ApeDaoContext } from "../components/Context/solutions";
import Checkingmembership from "../components/Checkingmembership";
import Lander from "../components/Home/Lander";

const NewDao = () => {
  const { daoMember, address } = useContext(ApeDaoContext);

  ////////////////////////////////////////////////////

  console.log({ daoMember });
  //////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      {daoMember ? (
        <>
          {daoMember > 0 && <Daocompo />}
          {daoMember == 0 && (
            <>
              <Mintcompo />
            </>
          )}
        </>
      ) : (
        <>
          {address && <Checkingmembership />}
          {!address && (
            <div className="h-screen w-screen flex bg-gray-50 text-gray-600 justify-center items-center">
              <h2>Please Connect Your Wallet</h2>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NewDao;
