import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { AiFillAlert } from "react-icons/ai";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { IoIosAlbums } from "react-icons/io";
import { useContract, useContractRead, useAddress, useStorageUpload } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import Popup from "./Popup";
import Sendingtransaction from "./Home/Sendingtransaction";
import { client } from "../lib/sanityClient";
import Math from "mathjs";
import BigNumber from "bignumber.js";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";

const style = {
  wrapperMain: `w-full p-8 lg:p-16 h-screen md:h-screen lg:h-full bg-gray-50 flex flex-col items-center  `,
  wrapper: `relative  w-full flex flex-col items-center`,
  mintwrapper: `h-screen p-2 w-full bg-indigo-900 flex justify-center flex-col items-center  `,
  topContent: `flex  flex-col  lg:flex-row w-full items-center justify-center lg:justify-between`,
  nftImgContainer: `w-[330px] md:w-[400px] lg:w-[500] text-gray-400 text-xs  p-4 lg:p-8 m-8 card   border-gray-300 bg-gray-300  bg-opacity-30  rounded-lg h-48 lg:h-64 items-center `,
  playerContainer: `w-[330px] md:w-[400px] lg:w-[500] text-gray-400 text-xs  p-4 lg:p-8 m-8 card   border-gray-300 bg-gray-300  bg-opacity-30  rounded-lg h-32 lg:h-64 items-center `,
  formInputContainer: `p-2 mt-4 flex rounded  shadow-xl bg-gray-300 bg-opacity-30  w-full items-center justify-center `,
  formInput: `p-2 mb-2 w-full   bg-transparent lg:h-96 h-48`,
  formTitle: `text-2xl font-bold text-slate-600 mt-8`,
  buttonDelegate: ` sm:flex hidden flex shadow-xl bg-opacity-30 mt-8  lg:mt-[16px] mb-24 w-[130px] lg:w-[130px] bg-indigo-700 hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500 p-[0.8rem]  items-center justify-center h-[40px]  rounded-lg cursor-pointer text-black`,
  button: ` flex bg-opacity-30 shadow-xl mt-4 lg:mt-32 mx-8 w-[320px] lg:w-[400px] bg-gray-300 hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500 p-[0.8rem]  items-center justify-center h-16  rounded-lg cursor-pointer text-black`,
  headerIcon: `text-[#8a939b] mb-4 text-3xl font-black hover:text-white cursor-pointer`,
  searchBar: `relative flex flex-1 lg:my-[0.8rem] w-max-[520px] h-6 mt-8 mb-2  items-center bg-lime-500 rounded-[0.8rem] `,
  searchBarClosed: `relative flex flex-1 my-[0.8rem] w-max-[520px] h-6  items-center bg-red-500 rounded-[0.8rem] `,
  timeContainer: `container justify-center w-4/5 lg:w-full  shadow-xl rounded-lg mt-16 bg-gray-300 bg-opacity-30 flex-shrink-0  items-center p-4 h-32 lg:h-64 flex flex-row`,
  ethLogo: `items-center justify-center w-[72px]  lg:w-[300px]`,
  ethPotBalance: `items-center text-4xl lg:text-9xl text-gray-400 mr-16  lg:mr-32 font-bold`,
};

const Stakecompo = () => {
  const [gameClosed, setGameClosed] = useState();
  const [lotLoading, setLotLoading] = useState(false);
  const [buttonPop, setButtonPop] = useState(false);
  // const [approved, setApproved] = useState(false);

  const address = useAddress();

  const { contract: editionDrop, isLoading: isNftLoading } = useContract("0x7CF4e5794087691637d421B6FD304112fB190dB6", "edition-drop");

  const { contract } = useContract("0x4AeC5c40025b68fD252dbdd2F4Cb927b92AC5db1");

  //   const balance = useContractRead(contract, "getStakedBalance", [`${address}`]);
  const balance = useContractRead(contract, "getStakedBalance", address);
  const stakedBalance = balance?.data;
  const stakedPercentage = (stakedBalance / 10000) * 100;

  const rewardBalance = useContractRead(contract, "getBalance", address);
  const unroundedRewardBalance = rewardBalance?.data;
  const stakedRewardsBalance = unroundedRewardBalance;
  console.log({ stakedBalance });

  // console.log({ currentGameState });

  const listAmKpa = () => {
    setButtonPop(true);
  };

  const closePop = () => {
    setButtonPop(false);
  };

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

  // console.log({ lotLoading });

  return (
    <div className="relative  overflow-scroll bg-gray-50 h-screen md:h-screen lg:h-screen  justify-center bg-fixed">
      <div className="fixed h-screen md:h-screen w-screen flex items-center lg:h-full">
        <div className="absolute top-0 -left-4 w-[320px] h-[320px] lg:w-[720px] lg:h-[720px] bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob "></div>
        <div className="absolute top-0 -right-4 w-[320px] h-[320px] lg:w-[720px] lg:h-[720px] bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-[320px] h-[320px] lg:w-[720px] lg:h-[720px] bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="m-8 relative space-y-4"></div>
      </div>
      <div className="relative snap-start  w-screen h-screen  p-4 lg:p-16 flex flex-shrink-0 flex-col items-center">
        <Popup trigger={buttonPop}>
          <Sendingtransaction />
        </Popup>
        <div className={style.topContent}>
          <div className={style.nftImgContainer}>
            <div className={style.headerIcon}>
              <IoIosAlbums />
            </div>
            {lotLoading ? (
              <div className="text-sky-400">Loading...</div>
            ) : (
              <div>
                <div className="mt-4 font-bold">Your Total Staked ERC1155</div>
                <div className="font-bold text-4xl lg:text-8xl mt-8">{`${stakedBalance}`}</div>
              </div>
            )}
          </div>
          <div className={style.nftImgContainer}>
            <div className={style.headerIcon}>
              <BsFillBriefcaseFill />
            </div>
            {lotLoading ? (
              <div className="text-sky-400">Loading...</div>
            ) : (
              <div>
                <div className="mt-4 font-bold">Total Ownership</div>
                <div className="font-bold text-4xl lg:text-8xl mt-8">{`${stakedPercentage}`}%</div>
              </div>
            )}
          </div>
        </div>
        <div className={style.timeContainer}>
          <div>
            <img src="/Binance-Icon-Logo.wine.svg" alt="eth" className={style.ethLogo} />
          </div>
          <div>
            <div className="text-xl text-gray-400 lg:2-xl">REWARDS</div>
            {lotLoading ? (
              <div className="text-sky-400">Loading...</div>
            ) : (
              <div className={style.ethPotBalance}>
                <div>{`${stakedRewardsBalance}`} BNB</div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div
            className={style.button}
            onClick={() => {
              setTokensApproval();
              listAmKpa();
            }}
          >
            <div className={style.buttonText}>STAKE</div>
          </div>
          <div
            className={style.button}
            onClick={() => {
              unstakeTokens();
              listAmKpa();
            }}
          >
            <div className={style.buttonText}>UNSTAKE</div>
          </div>
        </div>
      </div>
      <div className="relative snap-start w-screen h-screen  p-4 lg:p-16  flex flex-col justify-center items-center">
        <h2 className="text-8xl text-gray-600 font-bold m-16">How It Works</h2>

        <img src="/howItWorksBG.png" alt="" className="w-[1020px]" />
      </div>
    </div>
  );
};

export default Stakecompo;
