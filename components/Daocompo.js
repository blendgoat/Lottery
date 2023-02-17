import { useContract, useSDK, MediaRenderer } from "@thirdweb-dev/react";
import React, { useEffect, useState, useMemo, useContext } from "react";
import Proposal from "./Proposal";
import Link from "next/link";
import Popup from "./Popup";
import Sendingtransaction from "../components/Home/Sendingtransaction";
import { ethers } from "ethers";

import { ApeDaoContext } from "../components/Context/solutions";

import { ThirdwebStorage } from "@thirdweb-dev/storage";

const style = {
  wrapper: `relative w-screen h-full bg-indigo-900 flex flex-col items-center  `,
  mintwrapper: `h-screen p-2 w-full bg-indigo-900 flex justify-center flex-col items-center  `,
  topItemsContainer: `flex flex-col lg:flex-row  justify-between  mt-8  rounded-xl p-8 lg:w-4/5 xl:w-4/5  `,
  ammtContainer: `text-[#5271ff] mt-2  flex-col rounded-xl  w-full `,
  topContents: `flex flex-col items-center rounded-xl p-8 w-4/5 justify-center `,
  formInputContainer: `p-2 mt-4 flex rounded bg-indigo-900 shadow-xl  w-2/3 items-center justify-center `,
  formInput: `p-2 mb-2   w-full bg-transparent h-96`,
  formTitle: `text-2xl font-bold text-slate-600 mt-16`,
  buttonDelegate: ` flex shadow-xl  mx-8 w-[320px] lg:w-[600px] bg-indigo-700 hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500 p-[0.8rem]  items-center justify-center h-16  rounded-lg cursor-pointer text-black`,
  button: ` flex shadow-xl mt-8 mx-8 w-[320px] lg:w-[600px] bg-indigo-700 hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500 p-[0.8rem]  items-center justify-center h-16  rounded-lg cursor-pointer text-black`,
  mintButton: ` flex shadow-xl mt-8  w-[320px] lg:w-[600px] bg-indigo-700 hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500 p-[0.8rem]  items-center justify-center h-16  rounded-lg cursor-pointer text-black`,
  buttonText: ` text-xl font-semibold p-3 text-slate-200 hover:text-slate-400   `,
  nftImg: `w-[300px] mb-16 object-cover shadow-2xl`,
};

const Daocompo = () => {
  const [proposals, setProposals] = useState([]);
  const [proposalDescription, setProposalDescription] = useState("");
  const [memberTokenAmounts, setMemberTokenAmounts] = useState([]);
  const [memberAddresses, setMemberAddresses] = useState([]);
  const [tbalance, setTbalance] = useState(0);
  const [nativeBalance, setNativeBalance] = useState(0);
  const [buttonPop, setButtonPop] = useState(false);

  const {
    address,
    nftBalance,
    daoMember,
    GetTreasureBalance,
    GetTreasureBalanceNative,
    nft,
    NftImage,
  } = useContext(ApeDaoContext);

  ////////////////////////////////////////////////////
  const storage = new ThirdwebStorage();

  const { contract: token, isLoading: isTokenLoading } = useContract(
    process.env.NEXT_PUBLIC_TOKEN
  );
  const { contract: vote, isLoading: isVoteLoading } = useContract(
    process.env.NEXT_PUBLIC_VOTE
  );

  const getAllProposals = async () => {
    const proposals = await vote
      ?.getAll()
      .then((proposals) => {
        setProposals(proposals?.reverse());
        console.log(proposals);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllProposals();
  }, [nftBalance]);
  console.log({ proposals });

  //////////////////////////////////////////////

  const sdk = useSDK();

  //////////////////////////////////////////////////////////////////////////////////////////

  const listAmKpa = () => {
    setButtonPop(true);
  };

  const closePop = () => {
    setButtonPop(false);
  };

  //////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////
  const ammount = 3000;
  const executions = [
    {
      // The contract you want to make a call to
      toAddress: token?.getAddress(),
      // The amount of the native currency to send in this transaction
      nativeTokenValue: 0,

      // Transaction data that will be executed when the proposal is executed
      // This is an example transfer transaction with a token contract (which you would need to setup in code)
      transactionData: token?.encoder.encode("transfer", [
        address,
        ethers.utils.parseUnits(ammount.toString(), 18),
      ]),
    },
  ];

  const createProposal = async () => {
    try {
      await vote.propose(proposalDescription, executions);
      window.location.reload();
    } catch (error) {
      console.log("create proposal error is", { error });
      closePop();
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////

  const checkDelegate = async () => {
    try {
      await token?.delegateTo(address);
      window.location.reload();
    } catch (err) {
      console.log(err);
      closePop();
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////

  const shortenAddress = (str) => {
    return str?.substring(0, 6) + "..." + str?.substring(str.length - 4);
  };

  //////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!nftBalance) return;
    GetTreasureBalance()
      .then((ownedTokenBalance) => {
        setTbalance(ownedTokenBalance);
        console.log({ ownedTokenBalance });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [nftBalance]);

  useEffect(() => {
    if (!nftBalance) return;
    GetTreasureBalanceNative()
      .then((balance) => {
        setNativeBalance(balance);
        console.log({ balance });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [nftBalance]);

  return (
    <div className={style.wrapper}>
      <Popup trigger={buttonPop}>
        <div className="w-full">
          <Sendingtransaction />
        </div>
      </Popup>

      <div className={style.topItemsContainer}>
        <div className="h-[150px] flex-col text-slate-600  p-4 font-bold bg-indigo-900 shadow-xl rounded-xl w-[300px]">
          <div>Treasury</div>
          <div className="text-[#5271ff] flex flex-col">
            <div>
              {tbalance?.symbol}: {tbalance?.displayValue}
            </div>
            <div>
              {nativeBalance?.symbol}: {nativeBalance?.displayValue}
            </div>
          </div>
        </div>
      </div>
      <div className="w-3/4 rounded m-16 font-bold text-[#5271ff] text-sm bg-indigo-900 shadow-xl flex flex-col items-center justify-center p-4">
        <div className="m-8">
          To take part in the voting and proposal process on our platform, you
          must delegate your BNG tokens to the designated voting contract. A
          minimum of 1000 BNG tokens is required to create proposals. Please
          note that this delegation is solely for the purpose of verifying your
          voting power and does not give any control over your funds.
        </div>
      </div>
      <button
        onClick={() => {
          checkDelegate();
          listAmKpa();
          // getUri();
        }}
        className={style.buttonDelegate}
      >
        Delegate
      </button>
      <div className={style.formTitle}>New Proposal</div>
      <div className={style.formInputContainer}>
        <div className={style.formInput}>
          <textarea
            type="text"
            value={proposalDescription}
            onChange={(e) => setProposalDescription(e.target.value)}
            placeholder="Description..."
            className={style.formInput}
          />
        </div>
      </div>
      <div>
        <button
          className={style.button}
          disabled={isVoteLoading}
          onClick={() => {
            createProposal();
            listAmKpa();
          }}
        >
          <div>Create Proposal</div>
        </button>
      </div>
      <div className="w-2/3 mt-24">
        {proposals?.map((proposal, id) => (
          <Proposal
            proposalId={proposal.proposalId}
            description={proposal.description}
            key={Math.random()}
            proposal={proposal}
            listAmKpa={listAmKpa}
            closePop={closePop}
          />
        ))}
      </div>
    </div>
  );
};

export default Daocompo;
