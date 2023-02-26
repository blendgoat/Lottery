import { useContract, useSDK } from "@thirdweb-dev/react";
import React, { useEffect, useState, useMemo, useContext } from "react";
import Proposal from "./Proposal";
import Popup from "./Popup";
import Sendingtransaction from "../components/Home/Sendingtransaction";
import { ethers } from "ethers";
import { AiFillAlert, AiFillAccountBook } from "react-icons/ai";

import { ApeDaoContext } from "../components/Context/solutions";
import Footert from "./Footert";

const style = {
  wrapperMain: `w-full p-8 lg:p-16 h-screen md:h-screen lg:h-full bg-gray-50 flex flex-col items-center  `,
  wrapper: `relative  w-full flex flex-col items-center  `,

  mintwrapper: `h-screen p-2 w-full bg-indigo-900 flex justify-center flex-col items-center  `,
  topContent: `flex  flex-col  lg:flex-row w-full items-center justify-center lg:justify-between`,
  nftImgContainer: `w-[330px] md:w-[400px] lg:w-[500] text-gray-400 text-xs  p-4 lg:p-8 m-8 card   border-gray-300 bg-gray-300  bg-opacity-30  rounded-lg h-64 items-center `,

  // topItemsContainer: `flex flex-col lg:flex-row  justify-between  mt-8  rounded-xl p-8 lg:w-4/5 xl:w-4/5  `,
  formInputContainer: `p-2 mt-4 flex rounded  shadow-xl bg-gray-300 bg-opacity-30  w-full items-center justify-center `,
  formInput: `p-2 mb-2 w-full   bg-transparent lg:h-96 h-48`,
  formTitle: `text-2xl font-bold text-slate-600 mt-8`,
  buttonDelegate: ` flex shadow-xl bg-opacity-30 mt-8  lg:mt-[16px] mb-24 w-[130px] lg:w-[130px] bg-indigo-700 hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500 p-[0.8rem]  items-center justify-center h-[40px]  rounded-lg cursor-pointer text-black`,
  button: ` flex bg-opacity-30 shadow-xl mt-8 mx-8 w-[320px] lg:w-[600px] bg-gray-300 hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500 p-[0.8rem]  items-center justify-center h-16  rounded-lg cursor-pointer text-black`,
  headerIcon: `text-[#8a939b] mb-4 text-3xl font-black hover:text-white cursor-pointer`,
};

const Daocompo = () => {
  const [proposals, setProposals] = useState([]);
  const [proposalDescription, setProposalDescription] = useState("");
  const [tbalance, setTbalance] = useState(0);
  const [nativeBalance, setNativeBalance] = useState(0);
  const [buttonPop, setButtonPop] = useState(false);

  const { address, nftBalance, GetTreasureBalance, GetTreasureBalanceNative } =
    useContext(ApeDaoContext);

  ////////////////////////////////////////////////////

  const { contract: token, isLoading: isTokenLoading } = useContract(
    process.env.NEXT_PUBLIC_TOKEN
  );
  const { contract: vote, isLoading: isVoteLoading } = useContract(
    process.env.NEXT_PUBLIC_VOTE
  );

  useEffect(() => {
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
    <div className="relative snap-y snap-mandatory overflow-scroll bg-gray-50 h-screen md:h-screen lg:h-screen  justify-center bg-fixed">
      <div className="fixed h-screen md:h-screen w-screen flex items-center lg:h-full">
        <div className="absolute top-0 -left-4 w-[320px] h-[320px] lg:w-[720px] lg:h-[720px] bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob "></div>
        <div className="absolute top-0 -right-4 w-[320px] h-[320px] lg:w-[720px] lg:h-[720px] bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-[320px] h-[320px] lg:w-[720px] lg:h-[720px] bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="m-8 relative space-y-4"></div>
      </div>
      <div className="relative snap-start w-screen h-screen  p-4 lg:p-16 flex flex-col items-center">
        <div className={style.topContent}>
          <div className={style.nftImgContainer}>
            <div
              className={style.headerIcon}
              // onClick={() => setIsOpen(true)}
            >
              <AiFillAlert />
            </div>
            <div>
              To take part in the voting and proposal process on our platform,
              you must delegate your BNG tokens to the designated voting
              contract. A minimum of 1000 BNG tokens is required to create
              proposals. Please note that this delegation is solely for the
              purpose of verifying your voting power and does not give any
              control over your funds.
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
          </div>
          <div className={style.nftImgContainer}>
            <div
              className={style.headerIcon}
              // onClick={() => setIsOpen(true)}
            >
              <AiFillAccountBook />
            </div>
            <div className="my-4">
              <div className="font-bold">
                {tbalance?.symbol}: {tbalance?.displayValue}
              </div>
              <div className="my-2"></div>
              <div className="font-bold">
                {nativeBalance?.symbol}: {nativeBalance?.displayValue}
              </div>
            </div>
            <div>
              The amounts displayed above indicate the total funds held by the
              treasury. The treasury is programmed to releass a maximum of
              5000BNGX and 1BNB per proposal which requires funding. These
              ammounts may be reviewed upwards by the community.
            </div>
          </div>
        </div>
        <div className="sm:flex hidden flex flex-col w-full justify-center items-center">
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
        </div>
      </div>
      <div>
        <div className="sm:hidden relative snap-start flex h-screen p-4 flex-col w-full">
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
        </div>
      </div>
      {proposals?.map((proposal, id) => (
        <div className="snap-start mt-32 relative w-screen h-screen flex items-center justify-center">
          <Proposal
            proposalId={proposal.proposalId}
            description={proposal.description}
            key={Math.random()}
            proposal={proposal}
            listAmKpa={listAmKpa}
            closePop={closePop}
          />
        </div>
      ))}
    </div>
  );
};

export default Daocompo;
