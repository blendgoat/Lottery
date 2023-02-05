import { useAddress, useContract } from "@thirdweb-dev/react";
import { VoteType } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import styles from "../styles/ProposalCard.module.css";
import truncateEthAddress from "truncate-eth-address";
import Popup from "./Popup";
import Sendingtransaction from "./Home/Sendingtransaction";

const style = {
  card: `p-8 my-8   bg-indigo-900 shadow-xl rounded-xl min-w-full  `,
  button: ` flex shadow-xl  w-[500px] bg-slate-300 hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500  m-8 p-[0.8rem]  items-center justify-center h-16  rounded-lg cursor-pointer text-black`,
};

export default function Proposal({ proposalId, description, proposal }) {
  const [votes, setVotes] = useState({ for: 0, against: 0, abstain: 0 });
  const [hasVoted, setHasVoted] = useState(true);
  const address = useAddress();
  const [buttonPop, setButtonPop] = useState(false);

  const { contract: token, isLoading: isTokenLoading } = useContract(
    process.env.NEXT_PUBLIC_TOKEN
  );
  const { contract: vote, isLoading: isVoteLoading } = useContract(
    process.env.NEXT_PUBLIC_VOTE
  );

  const listAmKpa = () => {
    setButtonPop(true);
  };

  const closePop = () => {
    setButtonPop(false);
  };

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
    try {
      castVote(VoteType.For);
    } catch (error) {
      closePop();
    }
  };

  const voteAgainst = () => {
    try {
      castVote(VoteType.Against);
    } catch (error) {
      closePop();
    }
  };

  const voteAbstain = () => {
    try {
      castVote(VoteType.Abstain);
    } catch (error) {
      closePop();
    }
  };

  const castVote = async (voteType) => {
    try {
      await vote.vote(proposalId, voteType);
      window.location.reload();
    } catch (error) {
      closePop();
    }
  };

  return (
    <div>
      <Popup trigger={buttonPop}>
        <Sendingtransaction />
      </Popup>
      <div className={style.card}>
        <div className={styles.top}>
          <div className="text-xl font-bold text-sky-400 mb-4">
            Proposer: {truncateEthAddress(proposal?.proposer)}
          </div>
        </div>

        <div className="text-xl text-slate-600 mb-8">{description}</div>
        <button
          disabled={hasVoted}
          className={style.button}
          onClick={() => {
            voteFor();
            listAmKpa();
          }}
        >
          <div className="text-slate-600">For</div>
        </button>
        <button
          disabled={hasVoted}
          className={style.button}
          onClick={() => {
            voteAgainst();
            listAmKpa();
          }}
        >
          <div className="text-slate-600"> Against </div>
        </button>

        <button
          disabled={hasVoted}
          className={style.button}
          onClick={() => {
            voteAbstain();
            listAmKpa();
          }}
        >
          <div className="text-slate-600"> Abstain</div>
        </button>
        <div className={styles.bottom}>
          <div className="flex text-sky-400 mt-8">
            {proposal.votes.map((vote, id) => {
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
