import { useState, useContext } from "react";

import Daocompo from "../components/Daocompo";
import Mintcompo from "../components/Mintcompo";
import { ApeDaoContext } from "../components/Context/solutions";
import Checkingmembership from "../components/Checkingmembership";

const NewDao = () => {
  const { daoMember } = useContext(ApeDaoContext);

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
          <Checkingmembership />
        </>
      )}
    </div>
  );
};

export default NewDao;
