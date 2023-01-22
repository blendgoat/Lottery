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
const style = {
  wrapper: `relative h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex flex-col items-center  `,
  container: `container m-4   flex flex-col justify-between`,
  contentWrapper: `flex h-screen relative justify-center flex-wrap items-center`,
  topContent: `flex items-center justify-center`,

  detailsContainer: `w-[500px] text-sky-400 ml-4 p-8 overflow-scroll   m-8 card rounded-lg h-48 shadow-xl items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 `,
  nftImgContainer: `w-[500px] p-8 m-8 card shadow-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-black rounded-lg h-48 items-center `,
  timeContainer: `container justify-center w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl rounded-lg mt-48  items-center p-2 h-64 flex`,
  ethcontainer: ` max-w-[280px] flex-1  mr-2 items-center justify-center `,
  ethLogo: `items-center justify-center`,
  ethPotBalance: `items-center text-9xl text-white/75  mr-32 font-bold`,
  button: ` flex shadow-xl mb-24 w-4/5 bg:white hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500  mt-24 p-[0.8rem]  items-center justify-center h-16  rounded-lg cursor-pointer text-black`,
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

  const { contract } = useContract(
    "0x143Ec8Fde617beF965ef9E949E68a0ed3cf50520"
  );

  const { data, isLoading } = useContractRead(contract, "getBalance");
  const players = useContractRead(contract, "getPlayers");
  const loterryState = useContractRead(contract, "lottery_state");

  const finalBalance = balance?.data.toString() / ("1e" + 18);

  const gamePlayers = thePlayers?.players;
  const finalPlayersList = gamePlayers?.data;

  const gameStateData = gameState?.loterryState;
  const currentGameState = gameStateData?.data;

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

  const entryValue = 0.01;
  const enterLottery = async () => {
    try {
      const data = await contract.call("enter", {
        value: ethers.utils.parseEther(`${entryValue}`),
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
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
                  <a href="">
                    <h2>DO NOT ENTER &rarr;</h2>
                    <p>
                      Lottery is currently closed and calculating winer. Click
                      here for our terms and conditions and more information. By
                      entering the lottery you accept our terms and conditions.
                    </p>
                  </a>
                  <div className={style.searchBarClosed}></div>
                </div>
              ) : (
                <>
                  <div className={style.nftImgContainer}>
                    <a href="">
                      <h2>ENTER &rarr;</h2>
                      <p>
                        Lottery is open, press the "Enter" button to play. Click
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
              <div className="flex my-2">{`${playerList}`}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={style.timeContainer}>
        <div className={style.ethcontainer}>
          <div>
            <img
              src="/Binance-Icon-Logo.wine.svg"
              alt="eth"
              className={style.ethLogo}
            />
          </div>
        </div>
        {isLoading ? (
          <div className="text-sky-400">Loading</div>
        ) : (
          <>
            <div>
              <div className="text-2xl/75">POT BALANCE</div>
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
        }}
      >
        <div className={style.buttonText}>Enter</div>
      </div>
    </div>
  );
};

{
  /* {loading ? (
  <Approvedloader approvedNfts={approvedNfts} />
) : (
  <div></div>
)} */
}

export default mainPage;
