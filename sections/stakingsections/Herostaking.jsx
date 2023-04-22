"use client";

import { motion } from "framer-motion";

import styles from "../../styles";
import { slideIn, staggerContainer, textVariant } from "../../utils/motion";
import React, { useContext } from "react";

import { ApeDaoContext } from "../../components/Context/solutions";

import Popup from "../../components/Popup";
import Sendingtransaction from "../../components/Home/Sendingtransaction";

import { AiFillAccountBook } from "react-icons/ai";
import { AiFillAlert } from "react-icons/ai";

import BigNumber from "bignumber.js";

const Herostaking = () => {
  const { buttonPop, listAmKpa, memberStakedBalance, setTokensApproval, unstakeTokens, isVoteLoading, stakedPercentage, unroundedRewardBalance } = useContext(ApeDaoContext);

  return (
    <section className={`${styles.yPaddings} lg:pl-8 pl-8`}>
      <Popup trigger={buttonPop}>
        <Sendingtransaction />
      </Popup>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.25 }} className={`${styles.innerWidth} mx-auto flex flex-col`}>
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
                  {/* To take part in the voting and proposal process on our platform, you must delegate your BNGX tokens to the designated voting contract. A minimum of 1000 BNG tokens is required to
                  create proposals. Please note that this delegation is solely for the purpose of verifying your voting power and does not give any control over your funds. */}
                </div>
                {memberStakedBalance == 0 && (
                  <button
                    onClick={() => {
                      setTokensApproval();
                      listAmKpa();
                      // getUri();
                    }}
                    className="flex shadow-xl bg-opacity-30 mt-8  lg:mt-[16px] w-[130px] lg:w-[130px] bg-indigo-700 hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500 p-[0.8rem]  items-center justify-center h-[40px]  rounded-lg cursor-pointer text-black"
                  >
                    Stake
                  </button>
                )}
                {memberStakedBalance > 0 && (
                  <button
                    onClick={() => {
                      unstakeTokens();
                      listAmKpa();
                      // getUri();
                    }}
                    className="flex shadow-xl bg-opacity-30 mt-8  lg:mt-[16px]  w-[130px] lg:w-[130px] bg-red-700 hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500 p-[0.8rem]  items-center justify-center h-[40px]  rounded-lg cursor-pointer text-primary-white"
                  >
                    Unstake
                  </button>
                )}

                <button
                  onClick={() => {
                    checkDelegate();
                    listAmKpa();
                    // getUri();
                  }}
                  className="flex shadow-xl bg-opacity-30 lg:mt-[16px] mt-8 w-[130px] lg:w-[130px] bg-indigo-700 hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500 p-[0.8rem]  items-center justify-center h-[40px]  rounded-lg cursor-pointer text-black"
                >
                  Claim
                </button>
              </div>
              <div className="w-[330px] md:w-[400px] lg:w-[500] text-gray-400 text-xs  p-4 lg:p-8    border-gray-300  rounded-lg h-64 items-center">
                <div
                  className="text-[#8a939b] mb-4 text-3xl font-black hover:text-white cursor-pointer"
                  // onClick={() => setIsOpen(true)}
                >
                  <AiFillAccountBook />
                </div>

                <div className="my-4">
                  <div className="font-bold">OWNERSHIP: {stakedPercentage}%</div>
                  <div className="my-2"></div>
                  <div className="font-bold">TOTAL STAKED: {memberStakedBalance?.toString()}</div>
                  <div className="my-2"></div>
                  <div className="font-bold">REWARDS: {unroundedRewardBalance?.toString()}</div>
                </div>
                <div>
                  The amounts displayed above indicate the total ERC1155 tokens held by the contract, your total rewards and your percentage ownership of the DAO. You currently own{" "}
                  {`${stakedPercentage}`}% of The Game DAO.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Herostaking;
