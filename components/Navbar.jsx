"use client";
import Link from "next/link";

import { motion } from "framer-motion";
import React, { useState } from "react";

import styles from "../styles";
import { navVariants } from "../utils/motion";
import { ConnectWallet } from "@thirdweb-dev/react";

const Navbar = () => {
  const [toggleDrawer, SetToggleDrawer] = useState(false);

  return (
  <motion.nav variants={navVariants} initial="hidden" whileInView="show" className={`${styles.xPaddings} py-8 relative`}>
    <div className="absolute w-[50%] inset-0 gradient-01" />
    <div className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}>
      <ConnectWallet accentColor="#f9fafb" border-radius="9999px" />
      <h2 className="font-extrabold text-[24px] leading-[30.24px] text-white">THE GAME DAO</h2>
      <img src="/menu.svg" alt="menu" className="w-[24px] h-[24px] object-contain"  onClick={() => SetToggleDrawer((prev) => !prev)} />
      <div
          className={`absolute top-[60px] flex right-0 left-0 bg-primary-black  z-20 shadow-secondary py-4 px-8 ${!toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"} transition-all duration-700`}
        >
        <div className="w-full flex flex-col ">
          <Link href="/">
              <div
                className="font-normal border-b text-white lg:text-[80px]"
                onClick={() => {
                  SetToggleDrawer(false);
                }}
              >
                <div className="hover:text-gray-600">HOME</div>
              </div>
            </Link>
            <Link href="/Dao">
              <div
                className="font-normal border-b text-white lg:text-[80px]"
                onClick={() => {
                  SetToggleDrawer(false);
                }}
              >
                <div className="hover:text-gray-600">DAO</div>
              </div>
            </Link>
            <Link href="/Staking">
              <div
                className="font-normal border-b text-white lg:text-[80px]"
                onClick={() => {
                  SetToggleDrawer(false);
                }}
              >
                <div className="hover:text-gray-600">STAKING</div>
              </div>
            </Link>
            {/* <Link href="/Aboutus">
              <div
                className="font-normal text-white lg:text-[80px]"
                onClick={() => {
                  SetToggleDrawer(false);
                }}
              >
              <div>ABOUT</div>
              </div>
            </Link> */}
            </div>
        </div>
    </div>
  </motion.nav>
);
  }

export default Navbar;
