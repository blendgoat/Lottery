import React, { useState, useEffect } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { AiFillAlert } from "react-icons/ai";
import {
  Web3Button,
  useContract,
  useContractWrite,
  useContractRead,
  useAddress,
} from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
// import { AwsKmsWallet } from "@thirdweb-dev/sdk/evm/wallets";
import { ethers } from "ethers";
// import styles from "../../styles/Home.module.css";
import Popup from "../../Popup";
import Sendingtransaction from "../Sendingtransaction";
import { client } from "../../../lib/sanityClient";

const style = {
  wrapper: `relative h-screen  md:h-screen lg:h-full w-full flex flex-col items-center  `,
  container: `container m-4   flex flex-col justify-between`,
  contentWrapper: `flex h-screen relative justify-center flex-wrap items-center`,
  topContent: `flex flex-col lg:flex-row w-full items-center justify-center lg:justify-between`,

  detailsContainer: ` w-[330px] md:w-[400px] lg:w-[500] text-xs text-gray-400 lg:text-base p-4 lg:p-8 overflow-scroll border-gray-300 bg-opacity-30   bg-gray-300 m-4  lg:m-8 card rounded-lg h-48  items-center  `,
  nftImgContainer: `w-[330px] md:w-[400px] lg:w-[500] text-gray-400 text-xs  p-4 lg:p-8 m-4  border-gray-300 bg-gray-300 bg-opacity-30  rounded-lg h-48 items-center `,
  timeContainer: `container justify-center w-4/5 lg:w-full  shadow-xl rounded-lg mt-4 md:mt-16 lg:mt-24 xl:mt-32 bg-gray-300 bg-opacity-30 flex-shrink-0  items-center p-4 h-32 lg:h-64 flex flex-row`,
  ethcontainer: ` max-w-[280px] flex-1  mr-2 items-center justify-center `,
  ethLogo: `items-center justify-center w-[72px]  lg:w-[300px]`,
  ethPotBalance: `items-center text-4xl lg:text-9xl text-gray-400 mr-16  lg:mr-32 font-bold`,
  button: ` flex shadow-xl xl:mb-16 w-4/5 bg:white hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500  mt-8 md:mt-24 lg:mt-8 xl:mt-24 p-[0.8rem]  items-center justify-center h-16  rounded-lg cursor-pointer text-black`,
  buttonText: ` text-xl font-semibold p-3 text-gray-400 hover:text-slate-400   `,
  searchBar: `relative flex flex-1 lg:my-[0.8rem] w-max-[520px] h-6 mt-8 mb-2  items-center bg-lime-500 rounded-[0.8rem] `,
  searchBarClosed: `relative flex flex-1 my-[0.8rem] w-max-[520px] h-6  items-center bg-red-500 rounded-[0.8rem] `,
  headerIcon: `text-[#8a939b] mb-2 text-3xl font-black hover:text-white cursor-pointer`,
};

const Gamefrontopen = () => {
  const [balance, setBalance] = useState();
  const [thePlayers, setThePlayers] = useState();
  const [gameState, setGameState] = useState();
  const [gameClosed, setGameClosed] = useState();
  const [lotLoading, setLotLoading] = useState(true);
  const [buttonPop, setButtonPop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gamerId, setGamerId] = useState();

  const address = useAddress();

  const { contract } = useContract(
    "0xeE3583630f0052B363c7Ad90F46346f1Bb004F73"
  );

  const { data, isLoading } = useContractRead(contract, "getBalance");
  const players = useContractRead(contract, "getPlayers");
  const loterryState = useContractRead(contract, "game_state");
  const gameId = useContractRead(contract, "gameId");

  const finalBalance = balance?.data.toString() / ("1e" + 18);

  console.log({ thePlayers });

  const finGamersID = gamerId?.gameId;
  const currentGameID = finGamersID?.data;

  // const made = currentGameID?.toString();

  // console.log({ made });

  const gamePlayers = thePlayers?.players;
  const finalPlayersList = gamePlayers?.data;

  const gameStateData = gameState?.loterryState;
  const currentGameState = gameStateData?.data;

  console.log({ currentGameState });

  const listAmKpa = () => {
    setLoading(true);
    setButtonPop(true);
  };

  useEffect(() => {
    if (currentGameState != 0) setGameClosed(true);
    else {
      setGameClosed(false);
    }
  }, [currentGameState]);

  useEffect(() => {
    if (!thePlayers) return;
    setLotLoading(false);
  }, [data]);

  const enterLottery = async () => {
    const entryValue = 0.01;
    try {
      const data = await contract.call("enter", {
        value: ethers.utils.parseEther(`${entryValue}`),
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
      console.log(result);
      closePop();
    } catch (err) {
      console.log({ err });
    }
  };

  const closePop = () => {
    setButtonPop(false);
  };

  useEffect(() => {
    if (!data) return;
    setBalance({ data });
  }, [data]);

  useEffect(() => {
    if (!players) return;
    setThePlayers({ players });
  }, [data]);

  useEffect(() => {
    if (!loterryState) return;
    setGameState({ loterryState });
  }, [data]);

  useEffect(() => {
    if (!gameId) return;
    setGamerId({ gameId });
  }, [data]);

  console.log({ lotLoading });

  for (var i = 0; i < finalPlayersList?.length; i++) {
    console.log({ finalPlayersList });
  }

  return (
    <div className="w-screen h-screen  p-4 lg:p-16 flex flex-col items-center">
      <div className={style.topContent}>
        <div className={style.nftImgContainer}>
          <div
            className={style.headerIcon}
            // onClick={() => setIsOpen(true)}
          >
            <AiFillAlert />
          </div>
          {lotLoading ? (
            <div className="text-sky-400">Loading...</div>
          ) : (
            <div>
              {currentGameState == 0 && (
                <>
                  <div>
                    <p>
                      Game is open, press the "Enter" button to play. By
                      entering the game you accept our terms and conditions.
                    </p>
                  </div>
                  <div className={style.searchBar}></div>
                </>
              )}
              {currentGameState > 0 && (
                <>
                  <div>
                    <p>
                      Game is currently closed and calculating winer. By
                      entering the game you accept our terms and conditions.
                    </p>
                  </div>
                  <div className={style.searchBarClosed}></div>
                </>
              )}
            </div>
          )}
        </div>
        <div className={style.nftImgContainer}>
          <div className={style.headerIcon}>
            <CgProfile />
          </div>
          <div className="my-4">
            {finalPlayersList?.map((playerList, id) => (
              <div key={id} className="my-2">{`${playerList}`}</div>
            ))}
            <div className="my-2"></div>
          </div>
        </div>
      </div>
      <div className={style.timeContainer}>
        <div>
          <img
            src="/Binance-Icon-Logo.wine.svg"
            alt="eth"
            className={style.ethLogo}
          />
        </div>
        <div>
          <div className="text-xl text-gray-400 lg:2-xl">POT BALANCE</div>
          {lotLoading ? (
            <div className="text-sky-400">Loading...</div>
          ) : (
            <div className={style.ethPotBalance}>
              <div>{`${finalBalance}`} BNB</div>
            </div>
          )}
        </div>
      </div>
      <div
        className={style.button}
        onClick={() => {
          enterLottery();
          listAmKpa();
        }}
      >
        <div className={style.buttonText}>Enter</div>
      </div>
    </div>
  );
};

export default Gamefrontopen;
