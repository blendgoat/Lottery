"use client";

import { motion } from "framer-motion";
import { TypingText } from "../components";

import styles from "../styles";
import { fadeIn, staggerContainer } from "../utils/motion";

const About = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <div className="gradient-02 z-0" />
    <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.25 }} className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}>
      <TypingText title="About" textStyles="text-center" />

      <motion.p variants={fadeIn("up", "tween", 0.2, 1)} className="mt-[8px] font-normal lg:text-xl text-[10px] text-center text-secondary-white">
        {/* <div className="relative  h-full  p-4 lg:p-16  flex flex-col justify-center items-center">
          <div className="lg:text-xl text-[8px] flex-col lg:flex-row justify-center "> */}
        <span>
          Our mission is to provide an exciting and fair gaming experience while giving back to the community through charitable donations, web3 grants, and investments. We believe in the power of
          blockchain and decentralization to create a more equitable and transparent world, and we strive to reflect these values in everything we do.
        </span>
        <span>
          Our game is simple and easy to play. With no need to choose numbers, all you have to do is click the enter button to join the game. A small fee of $3 BNB equivalent is charged and added to
          the pot, which grows as more players enter. The game remains open for 7 days or until there is at least 0.3BNB in the pot, after which it will close, select a jackpot winner and 20 runners
          up in a provably random way using chainlink, pay out all winners, and reset the game. To improve your chances you may enter as many times as you want. There is a platform fee of 10% on every
          transaction(≈ $0.30)
        </span>
        <span>
          What's more, we want to assure you that at no point are your funds held by the company, all game funds are held by the contract. The pot is split in a way that benefits everyone involved.
          50% goes to the lucky winner, 20% is split equally between the 20 selected runners up, 20% is deposited to the DAO treasury (where members can decide how the funds are distributed) for
          marketing and other DAO operations. 10% is distributed amongst all DAO members. Find out more about the DAO and how to become a member Here. We want you to be a part of this incredible
          journey and make a difference in the world. Join us and be a part of something amazing!
        </span>
        {/* </div>
        </div> */}
      </motion.p>

      <motion.img variants={fadeIn("up", "tween", 0.3, 1)} src="/arrow-down.svg" alt="arrow down" className="w-[18px] h-[28px] object-contain mt-[28px]" />
    </motion.div>
  </section>
);

export default About;
