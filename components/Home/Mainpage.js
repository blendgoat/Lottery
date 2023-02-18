import React, { useState, useEffect } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import {
  Web3Button,
  useContract,
  useContractWrite,
  useContractRead,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import styles from "../../styles/Home.module.css";
import Popup from "../Popup";
import Sendingtransaction from "./Sendingtransaction";

const style = {
  wrapper: `relative h-screen md:h-screen lg:h-full w-full bg-indigo-900 flex flex-col items-center  `,
  container: `container m-4   flex flex-col justify-between`,
  contentWrapper: `flex h-screen relative justify-center flex-wrap items-center`,
  topContent: `flex flex-col lg:flex-row items-center justify-center`,

  detailsContainer: `w-[330px] md:w-[400px] lg:w-[500] text-sm text-[#5271ff] lg:text-base ml-4 p-8 overflow-scroll   m-8 card rounded-lg h-48 shadow-xl items-center bg-indigo-900 `,
  nftImgContainer: `w-[330px] md:w-[400px] lg:w-[500] text-[#5271ff] text-sm lg:text-base p-8 m-8 card shadow-xl bg-indigo-900 border-black rounded-lg h-48 items-center `,
  timeContainer: `container justify-center w-full lg:w-full bg-indigo-900 shadow-xl rounded-lg mt-8 md:mt-16 lg:mt-32 xl:mt-32  items-center p-4 h-64 flex`,
  ethcontainer: ` max-w-[280px] flex-1  mr-2 items-center justify-center `,
  ethLogo: `items-center justify-center w-[200px]  lg:w-[300px]`,
  ethPotBalance: `items-center text-4xl lg:text-9xl text-white/75  mr-32 font-bold`,
  button: ` flex shadow-xl mb-16 xl:mb-24 w-4/5 bg:white hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500  mt-16 md:mt-24 lg:mt-8 xl:mt-24 p-[0.8rem]  items-center justify-center h-16  rounded-lg cursor-pointer text-black`,
  buttonText: ` text-xl font-semibold p-3 text-slate-200 hover:text-slate-400   `,
  searchBar: `relative flex flex-1 my-[0.8rem] w-max-[520px] h-6  items-center bg-lime-500 rounded-[0.8rem] `,
  searchBarClosed: `relative flex flex-1 my-[0.8rem] w-max-[520px] h-6  items-center bg-red-500 rounded-[0.8rem] `,
};

const mainPage = () => {
  const [balance, setBalance] = useState();
  const [thePlayers, setThePlayers] = useState();
  const [gameState, setGameState] = useState();
  const [gameClosed, setGameClosed] = useState();
  const [lotLoading, setLotLoading] = useState(true);
  const [buttonPop, setButtonPop] = useState(false);
  const [loading, setLoading] = useState(false);

  const { contract } = useContract(
    "0xd0FCC7Aa1EF5f95278Af3A85cB5e75B0443bda62"
  );

  const { data, isLoading } = useContractRead(contract, "getBalance");
  const players = useContractRead(contract, "getPlayers");
  const loterryState = useContractRead(contract, "lottery_state");

  const finalBalance = balance?.data.toString() / ("1e" + 18);

  const gamePlayers = thePlayers?.players;
  const finalPlayersList = gamePlayers?.data;

  const gameStateData = gameState?.loterryState;
  const currentGameState = gameStateData?.data;

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
      closePop();
    } catch (err) {
      console.error("contract call failure", err);
      closePop();
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

  console.log({ lotLoading });

  for (var i = 0; i < finalPlayersList?.length; i++) {
    console.log({ finalPlayersList });
  }

  return (
    <div className={style.wrapper}>
      <Popup trigger={buttonPop}>
        <Sendingtransaction />
      </Popup>

      <div className={style.topContent}>
        {lotLoading ? (
          <div className={style.nftImgContainer}>
            <div className="text-sky-400">Loading...</div>
          </div>
        ) : (
          <>
            <div>
              {gameClosed ? (
                <div className={style.nftImgContainer}>
                  <h2>DO NOT ENTER &rarr;</h2>
                  <p>
                    Game is currently closed and calculating winer. Click here
                    for our terms and conditions and more information. By
                    entering the lottery you accept our terms and conditions.
                  </p>

                  <div className={style.searchBarClosed}></div>
                </div>
              ) : (
                <>
                  <div className={style.nftImgContainer}>
                    <a href="">
                      <h2>ENTER &rarr;</h2>
                      <p>
                        Game is open, press the "Enter" button to play. Click
                        here for our terms and conditions and more information.
                        By entering the lottery you accept our terms and
                        conditions.
                      </p>
                    </a>
                    <div className={style.searchBar}></div>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        <div className={style.detailsContainer}>
          <h2>Entries &rarr;</h2>
          {finalPlayersList?.map((playerList, id) => (
            <div key={id}>
              <div className="flex lg:my-[5px] my-[2px]">{`${playerList}`}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={style.timeContainer}>
        {isLoading ? (
          <div className="text-sky-400">Loading</div>
        ) : (
          <>
            <img
              src="/Binance-Icon-Logo.wine.svg"
              alt="eth"
              className={style.ethLogo}
            />

            <div>
              <div className="text-xl lg:2-xl">POT BALANCE</div>
              <div className={style.ethPotBalance}>
                <div>{`${finalBalance}`} BNB</div>
                {/* <div>1000000000 BNB</div> */}
              </div>
            </div>
          </>
        )}
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

export default mainPage;
