import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";

const style = {
  container: ` bg-indigo-900`,
  main: `flex  h-screen relative justify-center flex-wrap items-center `,
  connect: `h-full bg-indigo-900`,
};

const Lander = () => {
  return (
    <div>
      <div className={style.container}>
        <div className={style.main}>
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
};

export default Lander;
