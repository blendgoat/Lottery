"use client";

import { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";

import styles from "../../styles";

import { staggerContainer } from "../../utils/motion";
import { TitleText, TypingText } from "../../components";
import { ApeDaoContext } from "../../components/Context/solutions";
import Proposal from "../../components/Proposal";

const Exploredao = () => {
  const [proposals, setProposals] = useState();
  const { vote, nftBalance } = useContext(ApeDaoContext);

  useEffect(() => {
    const getAllProposals = async () => {
      const proposals = await vote
        ?.getAll()
        .then((proposals) => {
          setProposals(proposals?.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAllProposals();
  }, [nftBalance]);

  return (
    <section className={`${styles.paddings}`} id="explore">
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.25 }} className={`${styles.innerWidth} mx-auto flex flex-col`}>
        <TypingText title="Voting" textStyles="text-center" />
        <TitleText title={<>View and Vote on Proposals</>} textStyles="text-center" />
        {!proposals && (
          <div className="mt-32 text-gray-400 relative w-screen h-screen flex items-center justify-center">
            <h2>Loading Proposals...</h2>
          </div>
        )}
        {proposals && (
          <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
            {proposals?.map((proposal, id) => (
              <Proposal proposalId={proposal.proposalId} description={proposal.description} key={Math.random(id)} proposal={proposal} listAmKpa={listAmKpa} closePop={closePop} />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Exploredao;
