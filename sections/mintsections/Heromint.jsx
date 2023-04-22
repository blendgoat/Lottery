"use client";

import { motion } from "framer-motion";
import { MediaRenderer } from "@thirdweb-dev/react";

import styles from "../../styles";
import { slideIn, staggerContainer, textVariant } from "../../utils/motion";
import React, { useContext } from "react";

import { ApeDaoContext } from "../../components/Context/solutions";

import Popup from "../../components/Popup";
import Sendingtransaction from "../../components/Home/Sendingtransaction";

import { AiFillAlert } from "react-icons/ai";

import BigNumber from "bignumber.js";

const Heromint = () => {
  const { buttonPop, listAmKpa, nftData, minIt } = useContext(ApeDaoContext);

  console.log({ nftData });

  return (
    <section className={`${styles.yPaddings} lg:pl-8 pl-8`}>
      <Popup trigger={buttonPop}>
        <Sendingtransaction />
      </Popup>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.25 }} className={`${styles.innerWidth} mx-auto mb-56 flex flex-col`}>
        <div className="flex justify-center items-center flex-col relative z-10">
          <motion.h2 variants={textVariant(1.1)} className={styles.heroHeading}>
            Mint
          </motion.h2>
          <motion.div variants={textVariant(1.2)} className="flex flex-row justify-center items-center">
            <h1 className={styles.heroHeading}>Membership</h1>

            <h1 className={styles.heroHeading}></h1>
          </motion.div>
        </div>

        <motion.div variants={slideIn("right", "tween", 0.2, 1)} className="relative w-full md:-mt-[20px] -mt-[12px]">
          <div className="w-full flex lg:flex-row flex-col  items-center sm:p-16">
            <div className=" w-full h-full md:w-full flex lg:flex-row flex-col  lg:w-full  lg:h-72 rounded-lg justify-between  ">
              <div className="w-[330px] md:w-[400px] lg:w-[500] text-gray-400 text-xs  p-4 lg:p-8    border-gray-300  rounded-lg h-64 items-center">
                <div
                  className="text-[#8a939b] mb-4 text-3xl font-black hover:text-white cursor-pointer"
                  // onClick={() => setIsOpen(true)}
                >
                  <AiFillAlert />
                </div>
                <div>
                  In order to acess the DAO or Staking you require a membership token. Membership tokens are also used in reward shares. Rewards are shared to users based on what percentage of the total (10,000) membership ERC1155 tokens a user has staked. You can mint up to a maximum of 1000 membership tokens per wallet.</div>
                <button
                  onClick={() => {
                    minIt();
                    listAmKpa();
                    // getUri();
                  }}
                  className="flex shadow-xl bg-opacity-30 mt-8  lg:mt-[16px] w-[130px] lg:w-[130px] bg-indigo-700 hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500 p-[0.8rem]  items-center justify-center h-[40px]  rounded-lg cursor-pointer text-black"
                >
                  Mint
                </button>
              </div>
              <div className="w-[330px] md:w-[400px] lg:w-[500] text-gray-400 text-xs  p-4 lg:p-8     border-gray-300  rounded-lg h-64 items-center">
                <div className="flex justify-center">
                  <MediaRenderer src={nftData?.animation_url} className="border  p-4 shadow-xl object-contain border-black" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Heromint;

{
  /* <section className={`${styles.yPaddings} lg:pl-8 pl-8`}>
  <Popup trigger={buttonPop}>
    <Sendingtransaction />
  </Popup>
  <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.25 }} className={`${styles.innerWidth} mx-auto mb-56 flex flex-col`}>
    <div className="flex justify-center items-center flex-col relative z-10">
      <motion.h2 variants={textVariant(1.1)} className={styles.heroHeading}>
        Mint
      </motion.h2>
      <motion.div variants={textVariant(1.2)} className="flex flex-row justify-center items-center">
        <h1 className={styles.heroHeading}>Membership</h1>

        <h1 className={styles.heroHeading}></h1>
      </motion.div>
    </div>

    <motion.div variants={slideIn("right", "tween", 0.2, 1)} className="relative w-full md:-mt-[20px] -mt-[12px]">
      <div className="w-full flex lg:flex-row flex-col  items-center sm:p-16">
        <div className=" w-full h-full md:w-full flex lg:flex-row flex-col  lg:w-full  lg:h-72 rounded-lg justify-between  ">
          <div className="w-[330px] md:w-[400px] lg:w-[500] text-gray-400 text-xs  p-4 lg:p-8    border-gray-300  rounded-lg h-64 items-center">
            <div
              className="text-[#8a939b] mb-4 text-3xl font-black hover:text-white cursor-pointer"
              // onClick={() => setIsOpen(true)}
            >
              <AiFillAlert />
            </div>

            <button
              onClick={() => {
                minIt();
                listAmKpa();
                // getUri();
              }}
              className="flex shadow-xl bg-opacity-30 mt-8  lg:mt-[16px] w-[130px] lg:w-[130px] bg-indigo-700 hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500 p-[0.8rem]  items-center justify-center h-[40px]  rounded-lg cursor-pointer text-black"
            >
              Mint
            </button>
          </div>
          <div className="w-[330px] md:w-[400px] lg:w-[500] text-gray-400 text-xs  p-4 lg:p-8     border-gray-300  rounded-lg h-64 items-center">
            <div className="flex justify-center">
              <MediaRenderer src={nftData?.animation_url} className="border  p-4 shadow-xl object-contain border-black" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
</section>; */
}
