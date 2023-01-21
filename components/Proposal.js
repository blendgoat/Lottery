import { useAddress, useContract } from "@thirdweb-dev/react";
import { VoteType } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import styles from "../styles/ProposalCard.module.css";
import truncateEthAddress from "truncate-eth-address";

const style = {
  card: `p-8 my-8  border-2 border-slate-800 rounded-xl min-w-full  `,
  button: ` flex shadow-xl  w-[500px] bg-slate-300 hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500  m-8 p-[0.8rem]  items-center justify-center h-16  rounded-lg cursor-pointer text-black`,
};

export default function Proposal({ proposalId, description, proposal }) {
  const [votes, setVotes] = useState({ for: 0, against: 0, abstain: 0 });
  const [hasVoted, setHasVoted] = useState(true);
  const address = useAddress();

  const { contract: token, isLoading: isTokenLoading } = useContract(
    process.env.NEXT_PUBLIC_TOKEN
  );
  const { contract: vote, isLoading: isVoteLoading } = useContract(
    process.env.NEXT_PUBLIC_VOTE
  );

  const getProposalData = async () => {
    if (isVoteLoading) return;
    const voted = await vote.hasVoted(proposalId, address);
    setHasVoted(voted);
    const votes = await vote.getProposalVotes(proposalId);
    setVotes({
      against: ethers.utils.formatEther(votes[0].count),
      for: ethers.utils.formatEther(votes[1].count),
      abstain: ethers.utils.formatEther(votes[2].count),
    });
  };

  useEffect(() => {
    getProposalData();
  }, [isVoteLoading]);

  const voteFor = () => {
    castVote(VoteType.For);
  };

  const voteAgainst = () => {
    castVote(VoteType.Against);
  };

  const voteAbstain = () => {
    castVote(VoteType.Abstain);
  };

  const castVote = async (voteType) => {
    await vote.vote(proposalId, voteType);
    window.location.reload();
  };

  return (
    <div>
      <div className={style.card}>
        <div className={styles.top}>
          <div className="text-xl font-bold text-sky-400 mb-4">
            Proposer: {truncateEthAddress(proposal?.proposer)}
          </div>
        </div>

        <div className="text-xl text-slate-600 mb-8">{description}</div>
        <button disabled={hasVoted} className={style.button} onClick={voteFor}>
          <div className="text-slate-600">For</div>
        </button>
        <button
          disabled={hasVoted}
          className={style.button}
          onClick={voteAgainst}
        >
          <div className="text-slate-600"> Against </div>
        </button>

        <button
          disabled={hasVoted}
          className={style.button}
          onClick={voteAbstain}
        >
          <div className="text-slate-600"> Abstain</div>
        </button>
        <div className={styles.bottom}>
          <div className="flex text-sky-400 mt-8">
            {proposal.votes.map((vote) => {
              const voteCount = ethers.utils.formatEther(vote.count);
              return (
                <div key={Math.random()}>
                  <div className="mx-2 font-bold">
                    {vote.label}: {Math.trunc(voteCount)} BNG
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
