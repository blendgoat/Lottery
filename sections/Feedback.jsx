"use client";

import { motion } from "framer-motion";

import styles from "../styles";
import { fadeIn, staggerContainer, zoomIn } from "../utils/motion";
import React from "react";

const teamMembers = [
  {
    name: "Delnoi Otsemobor",
    role: "Founder & CTO",
    bio: "At Bullion Foundation, Delnoi serves as our Founder & CTO, leading the development of our smart contracts and DApps. His contributions are integral to all of our application projects. Delnoi is a passionate learner and experimenter, always seeking out new languages and techniques for online technology development. He is proficient in several languages, including HTML, CSS, JavaScript, and Solidity. His love for technology and the web3 space drives him to explore and tinker with emerging technologies to build innovative and cutting-edge dapps that are both highly functional and simple to use. We are fortunate to have Delnoi as a member of our team, as his skills and dedication to the industry have been invaluable to us. His passion for technology and desire to drive the industry forward has inspired us all to keep pushing the boundaries of what's possible in the web3 space.",

    image: "/delpropic.png",
  },
  // { name: "Jane Smith", role: "CFO", image: "/logoHome.png" },
  // {
  //   name: "Create Your Proposal",
  //   role: "Marketing Director",
  //   image: "/logoHome.png",
  // },
];

const Feedback = () => {
  return (
    <section className={`${styles.paddings}`}>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.25 }} className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-6`}>
        <motion.div
          variants={fadeIn("right", "tween", 0.2, 1)}
          className="flex-[0.5] lg:max-w-[370px] flex justify-end flex-col gradient-05 sm:p-8 p-4 rounded-[32px] border-[1px] border-[#6A6A6A] relative"
        >
          <div className="feedback-gradient" />
          <div>
            <h4 className="font-bold sm:text-[32px] text-[26px] sm:leading-[40.32px] leading-[36.32px] text-white">Delnoi Otsemobor</h4>
            <p className="mt-[8px] font-normal sm:text-[18px] text-[12px] sm:leading-[22.68px] leading-[16.68px] text-white">Founder The Game DAO</p>
          </div>

          <p className="mt-[24px] font-normal sm:text-[24px] text-[18px] sm:leading-[45.6px] leading-[39.6px] text-white">
            “Decentralized organizations have come a long way. We believe they are going to change the landscape of crowd funding and crowd building.”
          </p>
        </motion.div>

        <motion.div variants={fadeIn("left", "tween", 0.2, 1)} className="relative flex-1 flex justify-center items-center">
          <img src="/planet-09.png" alt="planet-09" className="w-full lg:h-[610px] h-auto min-h-[210px] object-cover rounded-[40px]" />

          <motion.div variants={zoomIn(0.4, 1)} className="lg:block hidden absolute -left-[10%] top-[3%]">
            {teamMembers.map((member, id) => (
              <img className="h-16 w-16 rounded-full " key={member.role} src={member.image} alt={member.name} />
            ))}
            {/* <img src="/stamp.png" alt="stamp" className="w-[155px] h-[155px] object-contain" /> */}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Feedback;

<div className="grid grid-cols-1 md:grid-cols-3 lg:flex lg:flex-shrink-0 lg:w-4/5 lg:justify-center lg:items-center  gap-4">
  {teamMembers.map((member, id) => (
    <div key={member.name} className="bg-gray-900 bg-opacity-30 overflow-hidden shadow lg:p-8 p-2 rounded-lg">
      <div className="flex-shrink-0 lg:mt-4 ml-4">
        <img className="h-16 w-16 rounded-full" src={member.image} alt={member.name} />
      </div>

      <div className="px-4">
        <h3 className="text-lg font-bold  mb-2">{member.name}</h3>
        <h3 className="text-base font-bold  mb-2">{member.role}</h3>
        <div className="">{member.bio}</div>
      </div>
    </div>
  ))}
</div>;
