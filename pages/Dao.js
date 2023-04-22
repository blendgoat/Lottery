import { useState, useContext } from "react";

import Daocompo from "../components/Daocompo";
import Mintcompo from "../components/Mintcompo";
import { ApeDaoContext } from "../components/Context/solutions";
import Checkingmembership from "../components/Checkingmembership";
import Lander from "../components/Home/Lander";

const NewDao = () => {
  const { daoMember, address, memberStakedBalance } = useContext(ApeDaoContext);

  ////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      {daoMember > 0 || memberStakedBalance > 0 ? (
        <Daocompo />
      ) : (
        <>
          {daoMember == 0 && <Mintcompo />}
          {!address && (
            <div className="h-screen w-screen flex bg-gray-50 text-gray-600 justify-center items-center">
              <h2>Please Connect Your Wallet</h2>
            </div>
          )}
          {address && !daoMember && <Checkingmembership />}
        </>
      )}
    </div>
  );
};

export default NewDao;
