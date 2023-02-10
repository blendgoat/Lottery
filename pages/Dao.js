import { useContract, useSDK, MediaRenderer } from "@thirdweb-dev/react";
import { useEffect, useState, useMemo, useContext } from "react";
import Proposal from "../components/Proposal";
import Link from "next/link";
import Popup from "../components/Popup";
import Sendingtransaction from "../components/Home/Sendingtransaction";

import { ApeDaoContext } from "../components/Context/solutions";

import { ThirdwebStorage } from "@thirdweb-dev/storage";

const style = {
  wrapper: `relative h-full bg-indigo-900 flex flex-col items-center  `,
  mintwrapper: `h-screen p-2 w-full bg-indigo-900 flex justify-center flex-col items-center  `,
  topContent: `flex h-screen flex-col items-center rounded-xl p-4 w-4/5 justify-center `,
  topItemsContainer: `flex  justify-between  mt-8  rounded-xl p-8 w-4/5 `,
  ammtContainer: `text-[#5271ff] mt-2  flex-col rounded-xl  w-full `,
  topContents: `flex flex-col items-center rounded-xl p-8 w-4/5 justify-center `,
  formInputContainer: `p-2 mt-4 flex rounded bg-indigo-900 shadow-xl  w-2/3 items-center justify-center `,
  formInput: `p-2 mb-2   w-full bg-transparent h-96`,
  formTitle: `text-2xl font-bold text-slate-600`,
  button: ` flex shadow-xl mt-8 mx-8 w-[500px] bg-indigo-700 hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500 p-[0.8rem]  items-center justify-center h-16  rounded-lg cursor-pointer text-black`,
  buttonText: ` text-xl font-semibold p-3 text-slate-200 hover:text-slate-400   `,
  nftImg: `w-[300px] mb-16 object-cover shadow-2xl`,
};

const NewDao = () => {
  const [proposals, setProposals] = useState([]);
  const [proposalDescription, setProposalDescription] = useState("");
  const [memberTokenAmounts, setMemberTokenAmounts] = useState([]);
  const [memberAddresses, setMemberAddresses] = useState([]);
  const [tbalance, setTbalance] = useState(0);
  const [nativeBalance, setNativeBalance] = useState(0);
  const [hasMembership, setHasMembership] = useState();
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

  const metadata = {
    name: "BullionVoteNoDropFlat",
    voting_delay_in_blocks: 0,
    voting_period_in_blocks: 8600,
    voting_token_address: "0xf9fAa5973C6cb15d0aAB2b9ED0eC37E0A6BaD031",
    voting_quorum_fraction: 0,
    proposal_token_threshold: "1000",
    trusted_forwarders: [],
  };

  const getUri = async () => {
    const uri = await storage.upload(metadata);
    // This will log a URL like ipfs://QmWgbcjKWCXhaLzMz4gNBxQpAHktQK6MkLvBkKXbsoWEEy/0
    console.log(uri);
  };

  const getUriUrl = async () => {
    const uri = "ipfs://QmWGTyLo6jgy82diMyyMCkFzDxX7Bm3BghhUh2DonytZ7L/0";
    const url = storage.resolveScheme(uri);
    // This will log a URL like https://gateway.ipfscdn.io/ipfs/QmWgbcjKWCXhaLzMz4gNBxQpAHktQK6MkLvBkKXbsoWEEy/0
    console.log(url);
  };

  //////////////////////////////////////////////

  console.log({ nft });

  const { contract: token, isLoading: isTokenLoading } = useContract(
    process.env.NEXT_PUBLIC_TOKEN
  );
  const { contract: vote, isLoading: isVoteLoading } = useContract(
    process.env.NEXT_PUBLIC_VOTE
  );

  const { contract: editionDrop } = useContract(
    "0xa85caec09986d1AC483709A960bD1cCa972E3c44",
    "edition-drop"
  );

  console.log({ hasMembership });

  const sdk = useSDK();

  //////////////////////////////////////////////////////////////////////////////////////////

  const listAmKpa = () => {
    setButtonPop(true);
  };

  const closePop = () => {
    setButtonPop(false);
  };

  //////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (daoMember > 0) setHasMembership(true);
    console.log({ proposals });
  }, [nftBalance]);

  //////////////////////////////////////////////////////////////////////////////////////////

  const createProposal = async () => {
    try {
      await vote.propose(proposalDescription);
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

  const minIt = async () => {
    try {
      const tokenId = 0;
      const quantity = 1;

      const tx = await editionDrop.claimTo(address, tokenId, quantity);
      closePop();
      const receipt = tx.receipt;
    } catch (error) {
      console.log({ error });
      closePop();
    }
    // window.location.reload();
  };

  //////////////////////////////////////////////////////////////////////////////////////////

  const shortenAddress = (str) => {
    return str?.substring(0, 6) + "..." + str?.substring(str.length - 4);
  };

  //////////////////////////////////////////////////////////////////////////////////////////

  const getAllAddresses = async () => {
    try {
      const tokenId = 0;
      const memberAddresses = await editionDrop?.history.getAllClaimerAddresses(
        tokenId
      );
      setMemberAddresses(memberAddresses);
      console.log({ memberAddresses });
    } catch (error) {
      console.error("failed to get member list", error);
    }
  };

  useEffect(() => {
    if (hasMembership == false) return;
    getAllAddresses();
  }, [nftBalance]);

  //////////////////////////////////////////////////////////////////////////////////////////

  const getAllBalances = async () => {
    const holderBalance = token?.history;
    try {
      const amounts = await holderBalance?.getAllHolderBalances();
      setMemberTokenAmounts(amounts);
      console.log("👜 Amounts", amounts);
    } catch (error) {
      console.error("failed to get member balances", error);
    }
  };

  console.log({ memberTokenAmounts });

  useEffect(() => {
    if (!nftBalance || !token) return;
    getAllBalances();
    // memberList();
  }, [nftBalance, token]);

  //////////////////////////////////////////////////////////////////////////////////////////

  const memberList = () => {
    return memberAddresses?.map((address, id) => {
      const member = memberTokenAmounts?.find(
        ({ holder }) => holder === address
      );
      setMemberTokenAmounts(member);
    });
  };

  console.log({ nftBalance });

  useEffect(() => {
    if (!nftBalance || !memberAddresses) return;
    memberList();
  }, [address, isVoteLoading]);

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
    <div>
      {hasMembership ? (
        <>
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
              <div className="h-[150px] flex-col text-slate-600 overflow-scroll p-4 font-bold bg-indigo-900 shadow-xl rounded-xl w-[300px]">
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
                      {memberTokenAmounts ? (
                        <tbody>
                          {memberTokenAmounts.map((member, id) => {
                            return (
                              <tr
                                key={id}
                                className=" flex justify-between my-2"
                              >
                                <td>{shortenAddress(member.holder)}</td>
                                <td>{member?.balance.displayValue}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      ) : (
                        <tbody>
                          {/* {memberTokenAmounts.map((member, id) => {
                            return (
                              <tr
                                key={id}
                                className=" flex justify-between my-2"
                              >
                                <td>{shortenAddress(member.holder)}</td>
                                <td>{member?.balance.displayValue}</td>
                              </tr>
                            );
                          })} */}
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-3/4 rounded m-24 font-bold text-[#5271ff] bg-indigo-900 shadow-xl flex flex-col items-center justify-center p-4">
              <div>
                To take part in the voting and proposal process on our platform,
                you must delegate your BNG tokens to the designated voting
                contract. A minimum of 1000 BNG tokens is required to create
                proposals. Please note that this delegation is solely for the
                purpose of verifying your voting power and does not give any
                control over your funds.
              </div>
              <div className="flex ">
                <button
                  onClick={() => {
                    checkDelegate();
                    listAmKpa();
                    // getUri();
                  }}
                  className={style.button}
                >
                  Delegate
                </button>
                {/* <Link href="/Token"> */}
                <button
                  className={style.button}
                  onClick={() => {
                    checkDelegate();
                    listAmKpa();
                    // getUriUrl();
                  }}
                >
                  Get BNG
                </button>
                {/* </Link> */}
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
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={style.mintwrapper}>
            <Popup trigger={buttonPop}>
              <div className="w-full">
                <Sendingtransaction />
              </div>
            </Popup>

            <MediaRenderer
            // src={NftImage.animation_url}
            // className={style.nftImg}
            />
            <h1>Mint 🍪DAO Membership</h1>
            <button
              onClick={() => {
                minIt();
                listAmKpa();
              }}
              className={style.button}
            >
              Mint
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewDao;
