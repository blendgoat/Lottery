//Import Dependencies and hooks needed for app
import { createContext, useEffect, useState } from "react";
import { useContract, useContractRead, useAddress, useMetamask, useDisconnect, useNetwork, useNFTBalance, useSDK, useTokenBalance } from "@thirdweb-dev/react";
import { VoteType } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

import { client } from "../../lib/sanityClient";
import BigNumber from "bignumber.js";

export const ApeDaoContext = createContext();
export const ApeDaoProvider = ({ children }) => {
  /*
    Step 1. Get User address using thirdwebs hook
    Step 2. Get Token and vote contract instances using thirdwebs hooks
    Step 3. We need way to connect and disconnect from the dapp.
  */
  const address = useAddress(); //Get the address using thirdwebs convenient hooks
  const sdk = useSDK();
  const network = useNetwork();

  const { contract: editionDrop, isLoading: isNftLoading } = useContract("0x7CF4e5794087691637d421B6FD304112fB190dB6", "edition-drop");

  const { contract: token, isLoading: isTokenLoading } = useContract(process.env.NEXT_PUBLIC_TOKEN);

  const { contract: vote, isLoading: isVoteLoading } = useContract(process.env.NEXT_PUBLIC_VOTE);

  const { contract: gameContract, isLoading: isgameContractLoading } = useContract("0xC63333Bea624a6D59f154E5f5e9063B7293D1320");

  const { contract: usdtContract, isLoading: isusdtContractLoading } = useContract("0x337610d27c682E347C9cD60BD4b3b107C9d34dDd");

  const { contract: stakingContract, isLoading: stakingContractLoading } = useContract("0x4AeC5c40025b68fD252dbdd2F4Cb927b92AC5db1");

  const thisTreasury = "0x65a4BeBA7eA7eE793e6E3C24157256ca842b0F03";

  /////////////////////////////////////// MEMBER STAKED BALANCE /////////////////////////////

  const usersStakedBalance = useContractRead(stakingContract, "getStakedBalance", address);
  const memberStakedBalance = usersStakedBalance?.data;

  /////////////////////////////////////// DAO USDT BALANCE /////////////////////////////

  const [musdtBalance, setMusdtBalance] = useState(0);
  const usdtContractBalance = useContractRead(usdtContract, "balanceOf", thisTreasury);

  const usdtBalanceHex = usdtContractBalance?.data;
  const usdtBalance = usdtBalanceHex?.toString();

  useEffect(() => {
    if (!usdtBalanceHex) return;
    const ethValue = ethers.utils.formatEther(usdtBalance);
    setMusdtBalance(ethValue);
  }, [usdtBalance]);

  /////////////////////////////////// GET NFT IMAGE ///////////////////////////////////////

  const nftData = globalThis.data;

  const nft = editionDrop
    ?.get("0")
    .then((result) => {
      const nftData = result.metadata;
      globalThis.data = nftData;
    })
    .catch((err) => {
      console.log(err);
    });

  /////////////////////////////////// USER DAO MEMBERSHIP TOKEN BALANCE ///////////////////////////////////////

  const { data: nftBalance } = useNFTBalance(editionDrop, address, "0");
  const daoMember = nftBalance?.toString();

  /////////////////////////////////// DAO TREASURY BNGX BALANCE///////////////////////////////////////

  const bngxTreasury = useContractRead(token, "balanceOf", thisTreasury);
  const bngxTreasuryBalance = bngxTreasury?.data;

  /////////////////////////////////// DAO TREASURY BNB BALANCE///////////////////////////////////////

  const GetTreasureBalanceNative = async () => {
    const balance = await sdk?.getBalance("0x65a4BeBA7eA7eE793e6E3C24157256ca842b0F03");

    return balance;
  };

  /////////////////////////////////// DELEGATE ///////////////////////////////////////

  const checkDelegate = async () => {
    try {
      await token?.delegateTo(address);
      window.location.reload();
    } catch (err) {
      console.log(err);
      closePop();
    }
  };

  /////////////////////////////////// SUBMIT PROPOSALS ///////////////////////////////////////

  const createProposal = async (proposalDescription) => {
    const ammount = 0;
    const nativeTokenAmmount = 0;
    const contractFunction = "";
    const args = "";
    const trustedForwarder = "0x9FDB6980fA534fA88038e8Ef2F72aE344D3111D3";

    const executions = [
      {
        // The contract you want to make a call to
        toAddress: token?.getAddress(),
        // The amount of the native currency to send in this transaction
        nativeTokenValue: nativeTokenAmmount,

        // Transaction data that will be executed when the proposal is executed
        // This is an example transfer transaction with a token contract (which you would need to setup in code)

        transactionData: vote?.encoder.encode("transfer", [trustedForwarder, ethers.utils.parseUnits(ammount.toString(), 18)]),
      },
    ];
    try {
      await vote.propose(proposalDescription, executions);
      window.location.reload();
    } catch (error) {
      console.log("create proposal error is", { error });
      closePop();
    }
  };

  /////////////////////////////////// GET PROPOSALS ///////////////////////////////////////

  const getAllProposals = async () => {
    const proposals = await vote?.getAll();
  };

  /////////////////////////////////// EXECUTE PROPOSALS ///////////////////////////////////////

  const executeProposal = async (id, closePop) => {
    const canExecute = await isExecutable(id);
    if (canExecute) {
      try {
        const res = await vote.execute(id);
        closePop();
      } catch (error) {
        console.log(error);
        closePop();
      }
    } else {
      console.log("Can not execute");
    }
  };

  //Check if proposal given is executable
  const isExecutable = async (id) => {
    const canExecute = await vote.canExecute(id);
    return canExecute;
  };

  const [buttonPop, setButtonPop] = useState(false);

  /////////////////////////////////// ENTER GAME ///////////////////////////////////////

  const gameId = useContractRead(gameContract, "getGameId");
  const currentGameID = gameId?.data;

  const enterGame = async () => {
    // const entryValue = 0.011;
    try {
      const data = await gameContract.call("getLatestBNBUsdPrice");
      console.info("contract call successs", data);
      // console.log({ data });
      payGameEntry(data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const payGameEntry = async (data) => {
    const entryData = new BigNumber(data._hex);
    // console.log(entryData.toString());
    const weiToEth = new BigNumber("1e18");
    const wei = entryData.toString();
    // console.log(wei);
    const entryValue = new BigNumber(wei);
    const enterting = entryValue.dividedBy(weiToEth);
    // console.log(enterting.toString());
    // const gameId = currentGameID?.toString();
    try {
      const data = await gameContract.call("enter", {
        value: ethers.utils.parseEther(`${enterting}`),
      });
      console.info("contract call successs", data);
      addWhiteList();
    } catch (err) {
      console.error("contract call failure", err);
      closePop();
    }
  };

  const addWhiteList = async () => {
    const userDoc = {
      _type: "users",
      _id: address,
      gameId: currentGameID?.toString(),
      walletAddress: address,
    };

    try {
      const result = await client.createIfNotExists(userDoc);
      // console.log(result);
      closePop();
    } catch (err) {
      // console.log({ err });
    }
  };

  /////////////////////////////////// POP-UP CONTROL ///////////////////////////////////////

  const closePop = () => {
    setButtonPop(false);
  };

  const listAmKpa = () => {
    setButtonPop(true);
  };

  /////////////////////////////////// STAKE TOKENS ///////////////////////////////////////

  const setTokensApproval = async () => {
    const operator = "0x4AeC5c40025b68fD252dbdd2F4Cb927b92AC5db1";
    const approved = true;
    try {
      const data = await editionDrop.call("setApprovalForAll", operator, approved);
      console.info("contract call successs", data);
      stakeTokens();
    } catch (err) {
      console.error("contract call failure", err);
      closePop();
    }
  };

  const stakeTokens = async () => {
    try {
      const data = await contract.call("stake", {});
      console.info("contract call successs", data);
      closePop();
    } catch (err) {
      console.error("contract call failure", err);
      closePop();
    }
  };

  /////////////////////////////////// UNSTAKE TOKENS ///////////////////////////////////////

  const unstakeTokens = async () => {
    try {
      const data = await contract.call("unstake", {});
      console.info("contract call successs", data);
      closePop();
    } catch (err) {
      console.error("contract call failure", err);
      closePop();
    }
  };

  /////////////////////////////////// GET STAKED PERCENTAGE OF DAO ///////////////////////////////////////

  const stakedPercentage = (memberStakedBalance / 10000) * 100;

  /////////////////////////////////////// MEMBER REWARDS BALANCE /////////////////////////////

  const rewardBalance = useContractRead(stakingContract, "getBalance", address);
  const unroundedRewardBalance = rewardBalance?.data;
  const stakedRewardsBalance = unroundedRewardBalance;

  /////////////////////////////////////// GAME STATE /////////////////////////////
  const initialGameState = useContractRead(gameContract, "getGameState");

  const gameContractBalance = useContractRead(gameContract, "getBalance");
  const currentGamePlayers = useContractRead(gameContract, "getPlayers");

  /////////////////////////////////////// MINT MEMBERSHIP /////////////////////////////

  const minIt = async (quantity) => {
    try {
      const tokenId = 0;

      const tx = await editionDrop.claimTo(address, tokenId, quantity);
      closePop();
      const receipt = tx.receipt;
    } catch (error) {
      console.log({ error });
      closePop();
    }
    // window.location.reload();
  };

  return (
    <ApeDaoContext.Provider
      value={{
        address,
        getAllProposals,
        nftBalance,
        daoMember,
        network,

        memberStakedBalance,
        isExecutable,

        GetTreasureBalanceNative,
        executeProposal,
        enterGame,
        gameContract,
        buttonPop,
        listAmKpa,
        musdtBalance,
        bngxTreasuryBalance,
        usdtContractBalance,
        token,
        vote,
        checkDelegate,
        createProposal,
        setTokensApproval,
        unstakeTokens,
        stakedPercentage,
        isVoteLoading,
        unroundedRewardBalance,
        initialGameState,
        gameContractBalance,
        currentGamePlayers,
        nftData,
        minIt,
      }}
    >
      {children}
    </ApeDaoContext.Provider>
  );
};
