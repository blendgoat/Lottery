//Import Dependencies and hooks needed for app
import { createContext, useEffect, useState } from "react";
import { useContract, useContractRead, useAddress, useMetamask, useDisconnect, useNetwork, useNFTBalance, useSDK, useTokenBalance } from "@thirdweb-dev/react";
import { VoteType } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

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
  console.log({ network });

  const { contract: editionDrop, isLoading: isNftLoading } = useContract("0x7CF4e5794087691637d421B6FD304112fB190dB6", "edition-drop");

  const { contract: token, isLoading: isTokenLoading } = useContract(process.env.NEXT_PUBLIC_TOKEN);

  const { contract: vote, isLoading: isVoteLoading } = useContract(process.env.NEXT_PUBLIC_VOTE);

  const { contract } = useContract("0x4AeC5c40025b68fD252dbdd2F4Cb927b92AC5db1");
  const usersStakedBalance = useContractRead(contract, "getStakedBalance", address);
  const memberStakedBalance = usersStakedBalance?.data;

  const NftImage = globalThis.data;

  const nft = editionDrop
    ?.get("0")
    .then((result) => {
      const nftData = result.metadata;
      globalThis.data = nftData;
    })
    .catch((err) => {
      console.log(err);
    });

  const { data: nftBalance } = useNFTBalance(editionDrop, address, "0");
  const daoMember = nftBalance?.toString();

  const GetTreasureBalance = async () => {
    const ownedTokenBalance = await token?.balanceOf("0x65a4BeBA7eA7eE793e6E3C24157256ca842b0F03");

    return ownedTokenBalance;
  };

  const GetTreasureBalanceNative = async () => {
    const balance = await sdk?.getBalance("0x65a4BeBA7eA7eE793e6E3C24157256ca842b0F03");

    return balance;
  };

  const getAllProposals = async () => {
    const proposals = await vote?.getAll();
  };

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

  return (
    <ApeDaoContext.Provider
      value={{
        address,
        getAllProposals,
        nftBalance,
        daoMember,
        network,
        nft,
        isNftLoading,
        NftImage,
        memberStakedBalance,
        isExecutable,
        GetTreasureBalance,
        GetTreasureBalanceNative,

        executeProposal,
      }}
    >
      {children}
    </ApeDaoContext.Provider>
  );
};
