"use client";

import { motion } from "framer-motion";
import { socials } from "../constants";

import styles from "../styles";
import { footerVariants } from "../utils/motion";
import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";

import React, { useState, useEffect, useContext } from "react";
import { ApeDaoContext } from "../components/Context/solutions";

const Footer = () => {
  const { initialGameState, enterGame, buttonPop, listAmKpa } = useContext(ApeDaoContext);

  const currentGameState = initialGameState?.data;

  return (
    <motion.footer variants={footerVariants} initial="hidden" whileInView="show" className={`${styles.xPaddings} py-8 relative`}>
      <div className="footer-gradient" />
      <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
        <div className="flex items-center justify-between flex-wrap gap-5">
          <h4 className="font-bold md:text-[64px] text-[44px] text-white">Feeling Lucky?</h4>
          {currentGameState == 1 && (
            <div
              className="flex shadow-xl   bg-gray-300 hover:bg-gradient-to-r from-indigo-500 w-48 lg:w-56 lg:h-24 h-20 border-2 border-black   via-pink-500 to-pink-500 p-[0.8rem]  items-center justify-center h-16  rounded-full cursor-pointer text-black"
              onClick={() => {
                enterGame();
                listAmKpa();
              }}
            >
              <div className="font-bold text-2xl">Enter</div>
            </div>
          )}
          {currentGameState == 0 && (
            <div
              className="flex shadow-xl   bg-red-300 hover:bg-gradient-to-r from-indigo-500 w-48 lg:w-56 lg:h-24 h-20 border-2 border-black   via-pink-500 to-pink-500 p-[0.8rem]  items-center justify-center h-16  rounded-full cursor-pointer text-black"
              onClick={() => {
                enterGame();
                listAmKpa();
              }}
            >
              <div className="font-bold text-2xl">Closed</div>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="mb-[50px] h-[2px] bg-white opacity-10" />

          <div className="flex items-center justify-between flex-wrap gap-4">
            <h4 className="font-extrabold text-[24px] text-white">THE GAME DAO</h4>
            <p className="font-normal text-[14px] text-white opacity-50">Copyright © 2023 Bullion Labs. All rights reserved.</p>

            <div className="flex gap-4">
              {socials.map((social) => (
                <a href={`${social.website}`} target="_blank" rel="noopener noreferrer">
                  <img key={social.name} src={social.url} alt={social.name} className="w-[24px] h-[24px] object-contain cursor-pointer" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
