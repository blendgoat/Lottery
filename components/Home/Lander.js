import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../../styles/Home.module.css";

const style = {
  container: ` bg-gradient-to-r from-violet-500 to-fuchsia-500`,
  main: `flex  h-screen relative justify-center flex-wrap items-center `,
  connect: `h-full bg-gradient-to-r from-violet-500 to-fuchsia-500`,
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
