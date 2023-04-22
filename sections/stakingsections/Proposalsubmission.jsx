"use client";

import { motion } from "framer-motion";
import { TypingText } from "../../components";
import { useState, useContext } from "react";
import { ethers } from "ethers";

import styles from "../../styles";
import { fadeIn, staggerContainer } from "../../utils/motion";
import { ApeDaoContext } from "../../components/Context/solutions";

const Proposalsubmission = () => {
  const [proposalDescription, setProposalDescription] = useState("");

  const { createProposal, token, address, vote } = useContext(ApeDaoContext);

  return (
    <section className={`${styles.paddings} relative z-10`}>
      <div className="gradient-02 z-0" />
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.25 }} className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}>
        <motion.p variants={fadeIn("up", "tween", 0.2, 1)} className="mt-[8px] font-normal lg:text-xl text-[10px] text-center text-secondary-white"></motion.p>
        <div className=" flex flex-col w-full justify-center items-center">
          <div className="text-2xl font-bold text-slate-600 mt-8">New Proposal</div>
          <div className="p-2 mt-4 flex rounded  shadow-xl bg-gray-300 bg-opacity-30  w-full items-center justify-center ">
            <div className="p-2 mb-2 w-full   bg-transparent lg:h-96 h-48">
              <textarea
                type="text"
                value={proposalDescription}
                onChange={(e) => setProposalDescription(e.target.value)}
                placeholder="Description..."
                className="p-2 mb-2 w-full   bg-transparent lg:h-96 h-48"
              />
            </div>
          </div>
        </div>
        <button
          className="flex bg-opacity-30 shadow-xl mt-8 mx-8 w-[320px] lg:w-[600px] bg-gray-300 hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500 p-[0.8rem]  items-center justify-center h-16  rounded-lg cursor-pointer text-black"
          // disabled={isVoteLoading}
          onClick={() => {
            createProposal(proposalDescription, executions);
            // listAmKpa();
          }}
        >
          <div>Submit Proposal</div>
        </button>
        <motion.img variants={fadeIn("up", "tween", 0.3, 1)} src="/arrow-down.svg" alt="arrow down" className="w-[18px] h-[28px] object-contain mt-[28px]" />
      </motion.div>
    </section>
  );
};

export default Proposalsubmission;
