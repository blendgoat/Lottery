"use client";

import { motion } from "framer-motion";

import styles from "../styles";
import { slideIn, staggerContainer, textVariant } from "../utils/motion";
import React, { useState, useEffect, useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";
import { ApeDaoContext } from "../components/Context/solutions";
import { ethers } from "ethers";
import Popup from "../components/Popup";
import Sendingtransaction from "../components/Home/Sendingtransaction";
import { client } from "../lib/sanityClient";

import BigNumber from "bignumber.js";

const Hero = () => {
  const { initialGameState, enterGame, currentGamePlayers, gameContractBalance, buttonPop, listAmKpa } = useContext(ApeDaoContext);

  const [lotLoading, setLotLoading] = useState(true);

  const Balance = gameContractBalance?.data;

  const num = Balance?.toString() / ("1e" + 18);
  const roundedNum = num.toFixed(2); // rounds up to nearest tenth
  // console.log(roundedNum); // output: 0.1
  const finalBalance = roundedNum;

  // console.log({ finalBalance });

  const finalPlayersList = currentGamePlayers.data;
  const currentGameState = initialGameState?.data;

  // console.log({ currentGameState });

  useEffect(() => {
    if (isNaN(finalBalance)) return;
    setLotLoading(false);
  }, [gameContractBalance]);

  // console.log({ lotLoading });

  for (var i = 0; i < finalPlayersList?.length; i++) {
    // console.log({ finalPlayersList });
  }
  return (
    <section className={`${styles.yPaddings} sm:pl-16 pl-16`}>
      <Popup trigger={buttonPop}>
        <Sendingtransaction />
      </Popup>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.25 }} className={`${styles.innerWidth} mx-auto flex flex-col`}>
        <div className="flex justify-center items-center flex-col relative z-10">
          <motion.h2 variants={textVariant(1.1)} className={styles.heroHeading}>
            but Are you
          </motion.h2>
          <motion.div variants={textVariant(1.2)} className="flex flex-row justify-center items-center">
            <div className={styles.heroDText} />
            <h1 className={styles.heroHeading}>engen?</h1>

            <h1 className={styles.heroHeading}></h1>
          </motion.div>
        </div>

        <motion.div variants={slideIn("right", "tween", 0.2, 1)} className="relative w-full md:-mt-[20px] -mt-[12px]">
          <div className="absolute w-full h-[300px] z-20 hero-gradient  rounded-tl-[140px] items-center  -top-[30px]">
            <div className="w-full flex justify-between lg:flex-row flex-col  items-center p-16">
              <div className=" w-[330px]  md:w-[400px] lg:w-[500px]  lg:h-72 rounded-lg  h-32 flex items-center justify-center ">
                <div className="flex flex-col  justify-center">
                  <div className="flex justify-between px-8 md:p-0  w-[330px] mt-16 lg:mt-0 lg:mb-8 items-center">
                    <div>
                      <div className="text-xl  lg:2-xl">POT BALANCE</div>
                    </div>
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

                  <div className="px-8 md:p-0">
                    {lotLoading ? <div className="text-sky-400">Loading...</div> : <div className="text-4xl lg:text-8xl  opacity-70 font-bold">{`${finalBalance}`} BNB</div>}
                  </div>
                </div>
              </div>
              <div className="mt-16 lg:mt-0">
                <div className="w-[295px]  md:w-[400px] lg:w-[500px] p-4 lg:p-8  border-gray-300 bg-gray-300  bg-opacity-30  rounded-lg h-32 lg:h-64 items-center ">
                  <div className="flex justify-between">
                    <div className="text-[#8a939b] mb-4 text-3xl font-black hover:text-white cursor-pointer">
                      <CgProfile />
                    </div>
                    <div className="font-bold lg:text-[16px] text-white">PLAYERS</div>
                  </div>
                  <div className="my-4">
                    {finalPlayersList?.map((playerList, id) => (
                      <div key={id} className="my-2">{`${playerList}`}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <img src="/cover.png" alt="hero_cover" className="w-full sm:h-[500px] h-[350px] object-cover rounded-tl-[140px] opacity-10 z-10 relative" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
