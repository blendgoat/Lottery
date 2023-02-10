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

  const { contract: editionDrop, isLoading: isNftLoading } = useContract(
    "0xa85caec09986d1AC483709A960bD1cCa972E3c44",
    "edition-drop"
  );

  const NftImage = globalThis.data;

  const nft = editionDrop
    ?.get("0")
    .then((result) => {
      console.log({ result });
      const nftData = result.metadata;
      globalThis.data = nftData;
    })
    .catch((err) => {
      console.log(err);
    });

  const { contract: token, isLoading: isTokenLoading } = useContract(
    process.env.NEXT_PUBLIC_TOKEN
  );

  // const [hasMembership, setHasMembership] = useState();

  const { data: nftBalance } = useNFTBalance(editionDrop, address, "0");
  const daoMember = nftBalance?.toString();

  const GetTreasureBalance = async () => {
    const ownedTokenBalance = await token?.balanceOf(
      "0x952f931A5a118Ac8a90C339A79287E998d51BEe2"
    );

    return ownedTokenBalance;
  };

  const GetTreasureBalanceNative = async () => {
    const balance = await sdk?.getBalance(
      "0x952f931A5a118Ac8a90C339A79287E998d51BEe2"
    );

    return balance;
  };

  // useEffect(() => {
  //   if (nftBalance > 0) setHasMembership(true);
  //   console.log({ nftBalance });
  // }, [nftBalance]);

  //   const GetTreasureBalance = async () => {
  //     const ownedTokenBalance = await token?.balanceOf(
  //       "0x952f931A5a118Ac8a90C339A79287E998d51BEe2"
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
        daoMember,
        nft,
        isNftLoading,
        NftImage,
        GetTreasureBalance,
        GetTreasureBalanceNative,
      }}
    >
      {children}
    </ApeDaoContext.Provider>
  );
};
