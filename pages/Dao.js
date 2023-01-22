import {
  ConnectWallet,
  useAddress,
  useContract,
  useNFTBalance,
  useSDK,
} from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useMemo, useContext } from "react";
import Proposal from "../components/Proposal";
import styles from "../styles/Home.module.css";

import { ApeDaoContext } from "../components/Context/solutions";

const style = {
  wrapper: `relative h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex flex-col items-center  `,
  mintwrapper: `h-screen p-2 w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex justify-center flex-col items-center  `,
  topContent: `flex h-screen flex-col items-center rounded-xl p-4 w-4/5 justify-center `,
  topItemsContainer: `flex  justify-between  mt-8  rounded-xl p-8 w-4/5 `,
  ammtContainer: `flex text-sky-400 mt-2  flex-col rounded-xl  w-full `,
  topContents: `flex flex-col items-center rounded-xl p-8 w-4/5 justify-center `,
  formInputContainer: `p-2 mt-4 flex rounded border w-2/3 items-center justify-center `,
  formInput: `p-2 mb-2   w-full bg-transparent h-96`,
  formTitle: `text-2xl font-bold text-slate-600`,
  button: ` flex shadow-xl mt-8  w-[500px] bg:white hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500 p-[0.8rem]  items-center justify-center h-16  rounded-lg cursor-pointer text-black`,
  buttonText: ` text-xl font-semibold p-3 text-slate-200 hover:text-slate-400   `,
};

// export async function getServerSideProps() {
//   const { address } = "0xC560DAdA2F20E9e640dDEE893C75825526Fc4E33";
//   const editionDrop = "0x8b19873681db03931aDD0B63B32DDEECBe216Eaf";

//   const hasNft = useNFTBalance(editionDrop, address, "0");

//   // If they don't have an NFT, redirect them to the login page
//   if (!hasNft) {
//     console.log("User", "doesn't have an NFT! Redirecting...");
//     return {
//       noNft,
//     };
//   }

//   if (!hasNft) {
//     console.log("User", "doesn't have an NFT! Redirecting...");
//     return {
//       hasNft,
//     };
//   }

//   // Finally, return the props
//   return {
//     props: {},
//   };
// }

const NewDao = () => {
  // const address = useAddress();
  const [proposals, setProposals] = useState([]);
  const [proposalDescription, setProposalDescription] = useState("");
  const [memberTokenAmounts, setMemberTokenAmounts] = useState([]);
  const [memberAddresses, setMemberAddresses] = useState([]);
  const [tbalance, setTbalance] = useState(0);
  const [nativeBalance, setNativeBalance] = useState(0);
  const [hasMembership, setHasMembership] = useState();

  const { address, nftBalance } = useContext(ApeDaoContext);

  const { contract: token, isLoading: isTokenLoading } = useContract(
    process.env.NEXT_PUBLIC_TOKEN
  );
  const { contract: vote, isLoading: isVoteLoading } = useContract(
    process.env.NEXT_PUBLIC_VOTE
  );

  const thebalace = nftBalance?.toString();

  useEffect(() => {
    if (thebalace > 0) setHasMembership(true);
    console.log({ thebalace });
  }, [nftBalance]);

  const sdk = useSDK();
  const getProposals = async () => {
    if (!address || isVoteLoading) return;
    const data = await vote?.getAll();
    setProposals(data.reverse());
  };

  const createProposal = async () => {
    // const executions = [
    //   {
    //     // The contract you want to make a call to
    //     toAddress: "0x...",
    //     nativeTokenValue: 0.5,
    //     transactionData: token.encoder.encode("transfer", [
    //       fromAddress,
    //       amount,
    //     ]),
    //   },
    // ];

    await vote.propose(proposalDescription);
    window.location.reload();
  };

  const checkDelegate = async () => {
    if (isTokenLoading || !address) return;
    const delegation = await token.getDelegation();
    if (delegation !== address) {
      await token.delegateTo(address);
      window.location.reload();
    }
  };

  useEffect(() => {
    getProposals();
  }, [address, isVoteLoading]);

  useEffect(() => {
    if (!token || thebalace == 0) return;
    checkDelegate();
    console.log({ proposals });
  }, [isTokenLoading]);

  const { contract: editionDrop } = useContract(
    "0x8b19873681db03931aDD0B63B32DDEECBe216Eaf",
    "edition-drop"
  );

  const minIt = async () => {
    const tokenId = 0;
    const quantity = 1;

    const tx = await editionDrop.claimTo(address, tokenId, quantity);
    const receipt = tx.receipt;
  };

  const shortenAddress = (str) => {
    return str?.substring(0, 6) + "..." + str?.substring(str.length - 4);
  };

  const getAllAddresses = async () => {
    try {
      const memberAddresses = await editionDrop?.history.getAllClaimerAddresses(
        0
      );
      setMemberAddresses(memberAddresses);
      console.log({ memberAddresses });
    } catch (error) {
      console.error("failed to get member list", error);
    }
  };

  useEffect(() => {
    if (!nftBalance) return;
    getAllAddresses();
  }, [nftBalance, editionDrop?.history]);

  const getAllBalances = async () => {
    try {
      const amounts = await token?.history.getAllHolderBalances();
      setMemberTokenAmounts(amounts);
      console.log("👜 Amounts", amounts);
    } catch (error) {
      console.error("failed to get member balances", error);
    }
  };

  useEffect(() => {
    if (!nftBalance) return;
    getAllBalances();
    memberList();
  }, [nftBalance, token?.history]);

  useEffect(() => {
    if (!nftBalance) return;
    memberList();
  }, [address, isVoteLoading]);

  const memberList = () => {
    return memberAddresses?.map((address) => {
      const member = memberTokenAmounts?.find(
        ({ holder }) => holder === address
      );
      setMemberTokenAmounts(member);
    });
  };

  console.log({ tbalance });

  const GetTreasureBalance = async () => {
    const ownedTokenBalance = await token?.balanceOf(
      "0x2EA832C22ac15fD0c3E42bC774660D61504D9A43"
    );
    setTbalance(ownedTokenBalance);
    console.log({ ownedTokenBalance });

    const balance = await sdk?.getBalance(
      "0x2ea832c22ac15fd0c3e42bc774660d61504d9a43"
    );
    setNativeBalance(balance);
    console.log({ balance });
  };

  useEffect(() => {
    if (!nftBalance) return;
    GetTreasureBalance();
  }, [nftBalance]);

  return (
    <div>
      {address && (
        <div className={style.wrapper}>
          {hasMembership ? (
            <>
              <div className={style.topItemsContainer}>
                <div className="h-[150px] flex-col text-slate-600 p-4 font-bold rounded-xl border border-slate-400 w-[300px]">
                  <div>Treasury</div>
                  <div className="text-sky-400 flex flex-col">
                    <div>
                      {tbalance?.name}:{tbalance?.displayValue}
                    </div>
                    <div>
                      {nativeBalance?.name}: {nativeBalance?.displayValue}
                    </div>
                  </div>
                </div>
                <div className="h-[150px] text-slate-600 p-4 overflow-scroll font-bold rounded-xl border border-slate-400 w-[300px]">
                  <div>
                    <div> Members</div>
                    <div className=" my-2 overflow-scroll font-bold rounded-xl  w-full">
                      <table className={style.ammtContainer}>
                        <thead>
                          <tr className="flex justify-between  ">
                            <th>Address</th>
                            <th className="">Token Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {memberTokenAmounts?.map((member) => {
                            return (
                              <tr
                                key={member.address}
                                className=" flex justify-between"
                              >
                                <td>{shortenAddress(member.holder)}</td>
                                <td>{member?.balance.displayValue}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
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
                  onClick={createProposal}
                >
                  <div className="text-slate-600">Create Proposal</div>
                </button>
              </div>
              <div className="w-2/3 mt-24">
                {proposals?.map((proposal, id) => (
                  <Proposal
                    proposalId={proposal.proposalId}
                    description={proposal.description}
                    key={Math.random()}
                    proposal={proposal}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className={style.mintwrapper}>
                <h1>Mint 🍪DAO Membership</h1>
                <button
                  onClick={() => {
                    minIt();
                  }}
                  className={style.button}
                >
                  Mint
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NewDao;
