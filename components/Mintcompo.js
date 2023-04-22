import React, { useContract } from "@thirdweb-dev/react";
import { useContext, useState } from "react";
import { ApeDaoContext } from "../components/Context/solutions";
import Popup from "./Popup";
import Sendingtransaction from "./Home/Sendingtransaction";

import { Heromint } from "../sections/mintsections";
const style = {
  wrapper: `relative w-screen h-full bg-indigo-900 flex flex-col items-center  `,
  mintwrapper: `h-screen p-2 w-full bg-indigo-900 flex justify-center flex-col items-center  `,
  mintButton: ` flex shadow-xl mt-8  w-[320px] lg:w-[600px] bg-indigo-700 hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500 p-[0.8rem]  items-center justify-center h-16  rounded-lg cursor-pointer text-black`,
  buttonText: ` text-xl font-semibold p-3 text-slate-200 hover:text-slate-400   `,
};

const Mintcompo = () => {
  return (
    <div className="bg-primary-black overflow-hidden">
      <Heromint />
    </div>
  );
};

export default Mintcompo;
