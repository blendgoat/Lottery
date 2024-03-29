import React, { useContract } from "@thirdweb-dev/react";

const style = {
  wrapper: `relative w-screen h-full bg-indigo-900 flex flex-col items-center  `,
  mintwrapper: `h-screen p-2 w-full bg-indigo-900 flex justify-center flex-col items-center  `,
  mintButton: ` flex shadow-xl mt-8  w-[320px] lg:w-[600px] bg-indigo-700 hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500 p-[0.8rem]  items-center justify-center h-16  rounded-lg cursor-pointer text-black`,
  buttonText: ` text-xl font-semibold p-3 text-slate-200 hover:text-slate-400   `,
};

const Checkingmembership = () => {
  return (
    <div className={style.mintwrapper}>
      <h1>Checking Membership</h1>
    </div>
  );
};

export default Checkingmembership;
