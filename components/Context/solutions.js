//Import Dependencies and hooks needed for app
import { createContext, useEffect, useState } from "react";
import {
  useContract,
  useAddress,
  useMetamask,
  useDisconnect,
  useNFTBalance,
  useSDK,
} from "@thirdweb-dev/react";
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

  const { contract: editionDrop } = useContract(
    "0x8b19873681db03931aDD0B63B32DDEECBe216Eaf",
    "edition-drop"
  );

  const { contract: token, isLoading: isTokenLoading } = useContract(
    process.env.NEXT_PUBLIC_TOKEN
  );

  const { data: nftBalance } = useNFTBalance(editionDrop, address, "0");

  const [balance, setBalance] = useState(0);
  const [ownedTokenBalance, setOwnedTokeBalance] = useState(0);

  //   const GetTreasureBalance = async () => {
  //     const ownedTokenBalance = await token?.balanceOf(
  //       "0x2EA832C22ac15fD0c3E42bC774660D61504D9A43"
  //     );

  //     const balance = await sdk?.getBalance(
  //       "0x2ea832c22ac15fd0c3e42bc774660d61504d9a43"
  //     );
  //     return balance, ownedTokenBalance;
  //   };

  //Get all the proposals in the contract
  const getAllProposals = async () => {
    const proposals = await contract.getAll();
    console.log(proposals);
    return proposals;
  };

  //Check if proposal given is executable
  const isExecutable = async (id) => {};

  return (
    <ApeDaoContext.Provider
      value={{
        address,
        nftBalance,

        balance,
        ownedTokenBalance,
      }}
    >
      {children}
    </ApeDaoContext.Provider>
  );
};
