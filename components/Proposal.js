import { useAddress, useContract } from "@thirdweb-dev/react";
import { VoteType } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import React, { useEffect, useState, useMemo, useContext } from "react";
import styles from "../styles/ProposalCard.module.css";
import truncateEthAddress from "truncate-eth-address";
import Popup from "./Popup";
import Sendingtransaction from "./Home/Sendingtransaction";
import { ApeDaoContext } from "./Context/solutions";

const style = {
  card: `p-8 my-8 bg-gray-300 bg-opacity-30 shadow-xl rounded-xl w-full  `,
  button: `flex shadow-xl w-[200px]  lg:w-[500px] bg-slate-300 hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500  lg:m-8 m-4 p-[0.8rem]  items-center justify-center lg:h-16 h-8  rounded-lg cursor-pointer text-sm text-black`,
  executeButton: ``,
};

export default function Proposal({
  proposalId,
  description,
  proposal,
  closePop,
  listAmKpa,
}) {
  const [votes, setVotes] = useState({ for: 0, against: 0, abstain: 0 });
  const [hasVoted, setHasVoted] = useState(true);
  const address = useAddress();
  const [buttonPop, setButtonPop] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [statusColor, setStatusColor] = useState("#fff");

  const { executeProposal, isExecutable } = useContext(ApeDaoContext);

  const setStatus = () => {
    switch (proposal.state) {
      case 0:
        setStatusText("Pending");
        setStatusColor("#48494a");
      case 1:
        setStatusText("Active");
        setStatusColor("#21b66f");
        break;
      case 3:
        setStatusText("Defeated");
        setStatusColor("#f44336");
        break;
      case 7:
        setStatusText("Executed");
        setStatusColor("#0011ff");
        break;
      case 4:
        setStatusText("Successful");
        setStatusColor("#21b66f");
        break;
      default:
        setStatusText("Unknown");
        setStatusColor("#fff");
    }
  };

  useMemo(() => {
    setStatus();
  }, [statusText, statusColor, proposal.state]);

  const { contract: token, isLoading: isTokenLoading } = useContract(
    process.env.NEXT_PUBLIC_TOKEN
  );
  const { contract: vote, isLoading: isVoteLoading } = useContract(
    process.env.NEXT_PUBLIC_VOTE
  );

  // const listAmKpa = () => {
  //   setButtonPop(true);
  // };

  // const closePop = () => {
  //   setButtonPop(false);
  // };

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
      listAmKpa();
      window.location.reload();
    } catch (error) {
      closePop();
    }
  };

  return (
    <div className="w-screen h-screen">
      <Popup trigger={buttonPop}>
        <Sendingtransaction />
      </Popup>
      <div className="relative w-screen h-screen p-4  lg:p-16 flex flex-col items-center">
        <div className={style.card}>
          <div className={styles.top}>
            <div>
              <div className="lg:text-xl text-base  font-bold text-sky-400 my-4">
                Proposer: {truncateEthAddress(proposal?.proposer)}
              </div>
            </div>

            <div
              className={styles.status}
              style={{ backgroundColor: statusColor }}
            >
              {statusText}
            </div>
          </div>
          <div className="lg:text-xl w-full text-sm text-slate-600 mb-8">
            {description}
          </div>
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
            <div className="flex text-sky-400  mt-8">
              {proposal.votes.map((vote, id) => {
                const voteCount = ethers.utils.formatEther(vote.count);
                return (
                  <div key={Math.random()}>
                    <div className="mx-2 text-sm lg:text-base font-bold">
                      {vote.label}: {Math.trunc(voteCount)} BNGX
                    </div>
                  </div>
                );
              })}
            </div>
            {proposal.state === 4 && (
              <button
                className={styles.executeButton}
                onClick={() => {
                  executeProposal(proposal.proposalId, closePop);
                  listAmKpa();
                }}
              >
                Execute
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
