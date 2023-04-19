import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { AiFillAlert } from "react-icons/ai";
import { useContract, useContractRead, useAddress, useStorageUpload } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import Popup from "../Popup";
import Sendingtransaction from "./Sendingtransaction";
import { client } from "../../lib/sanityClient";
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
  button: ` flex bg-opacity-30 shadow-xl mt-8 mx-8 w-[320px] lg:w-[600px] bg-gray-300 hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500 p-[0.8rem]  items-center justify-center h-16  rounded-lg cursor-pointer text-black`,
  headerIcon: `text-[#8a939b] mb-4 text-3xl font-black hover:text-white cursor-pointer`,
  searchBar: `relative flex flex-1 lg:my-[0.8rem] w-max-[520px] h-6 mt-8 mb-2  items-center bg-lime-500 rounded-[0.8rem] `,
  searchBarClosed: `relative flex flex-1 my-[0.8rem] w-max-[520px] h-6  items-center bg-red-500 rounded-[0.8rem] `,
  timeContainer: `container justify-center w-4/5 lg:w-full  shadow-xl rounded-lg mt-4 md:mt-16 lg:mt-24 xl:mt-32 bg-gray-300 bg-opacity-30 flex-shrink-0  items-center p-4 h-32 lg:h-64 flex flex-row`,
  ethLogo: `items-center justify-center w-[72px]  lg:w-[300px]`,
  ethPotBalance: `items-center text-4xl lg:text-9xl text-gray-400 mr-16  lg:mr-32 font-bold`,
};

const mainPage = () => {
  const [gameClosed, setGameClosed] = useState();
  const [lotLoading, setLotLoading] = useState(true);
  const [buttonPop, setButtonPop] = useState(false);

  const address = useAddress();

  const { contract } = useContract("0xC63333Bea624a6D59f154E5f5e9063B7293D1320");

  const balance = useContractRead(contract, "getBalance");
  const players = useContractRead(contract, "getPlayers");
  const loterryState = useContractRead(contract, "getGameState");
  const gameId = useContractRead(contract, "getGameId");

  const Balance = balance?.data;

  const num = Balance?.toString() / ("1e" + 18);
  const roundedNum = num.toFixed(2); // rounds up to nearest tenth
  // console.log(roundedNum); // output: 0.1
  const finalBalance = roundedNum;

  // console.log({ finalBalance });

  const currentGameID = gameId?.data;
  const finalPlayersList = players.data;
  const currentGameState = loterryState?.data;

  // console.log({ currentGameState });

  const listAmKpa = () => {
    setButtonPop(true);
  };

  const closePop = () => {
    setButtonPop(false);
  };

  // const { mutateAsync: upload } = useStorageUpload();

  // const uploadData = async () => {
  //   // Get any data that you want to upload
  //   const dataToUpload = [
  //     {
  //       name: "BullionVoteMain",
  //       voting_delay_in_blocks: 0,
  //       voting_period_in_blocks: 604800,
  //       voting_token_address: "0xbda161E60c7d48f7A2eE5a98402035dBb2DaF257",
  //       voting_quorum_fraction: 40,
  //       proposal_token_threshold: "10000",
  //       trusted_forwarders: ["0x2E012dC6146049948408A5e55FCC8B680213958d", "0x7C7960a6bA196548f7e09cFAad13F562F7de09FF"],
  //     },
  //   ];

  //   // And upload the data with the upload function
  //   const uris = await upload({ data: dataToUpload });
  //   console.log({ uris });
  // };

  // const { mutateAsync: upload } = useStorageUpload();

  // const uploadData = async () => {
  //   // Get any data that you want to upload
  //   const dataToUpload = [
  //     {
  //       name: "BullionDAOGov",
  //       symbol: "BNGX",
  //       description: "Governance tokens for Bullion DAO",
  //       image: "ipfs://QmaQ7uSbQqCij1dHrEMdDcqLhjbAm2HXmqis4o6haFbbPX/logoHome.png",
  //     },
  //   ];

  //   // And upload the data with the upload function
  //   const uris = await upload({ data: dataToUpload });
  //   console.log({ uris });
  // };

  // const sdk = new ThirdwebSDK("binance");
  // const contract = await sdk.getContract(
  //   "0x9503FFBf273f3fcfD0B258950Db657e66788A9C9"
  // );

  // const uploadData = async () => {
  //   await contract.metadata.set({
  //     name: "BullionVoteMain",
  //     description: "My contract description",
  //   });
  // };

  useEffect(() => {
    if (currentGameState != 0) setGameClosed(true);
    else {
      setGameClosed(false);
    }
  }, [currentGameState]);

  useEffect(() => {
    if (isNaN(finalBalance)) return;
    setLotLoading(false);
  }, [balance]);

  const enterGame = async () => {
    // const entryValue = 0.011;
    try {
      const data = await contract.call("getLatestBNBUsdPrice");
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
      const data = await contract.call("enter", {
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

  // console.log({ lotLoading });

  for (var i = 0; i < finalPlayersList?.length; i++) {
    // console.log({ finalPlayersList });
  }
  return (
    <div className="relative   overflow-scroll bg-gray-50 h-screen md:h-screen lg:h-screen  justify-center bg-fixed">
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
              <AiFillAlert />
            </div>
            {lotLoading ? (
              <div className="text-sky-400">Loading...</div>
            ) : (
              <div>
                {currentGameState == 1 && (
                  <>
                    <div>Game is open, press the "Enter" button to play. By entering the game you accept our terms and conditions.</div>
                    <div className={style.searchBar}></div>
                    <button
                      onClick={() => {
                        enterGame();
                        listAmKpa();
                        // getUri();
                      }}
                      className={style.buttonDelegate}
                    >
                      Enter
                    </button>
                  </>
                )}
                {currentGameState != 1 && (
                  <>
                    <div>Game is currently closed or calculating winer. By entering the game you accept our terms and conditions.</div>
                    <div className={style.searchBarClosed}></div>
                  </>
                )}
              </div>
            )}
          </div>
          <div className={style.playerContainer}>
            <div
              className={style.headerIcon}
              // onClick={() => setIsOpen(true)}
            >
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
            <img src="/Binance-Icon-Logo.wine.svg" alt="eth" className={style.ethLogo} />
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
            uploadData();
            // listAmKpa();
          }}
        >
          <div className={style.buttonText}>Enter</div>
        </div>
      </div>
      <div className="relative snap-start w-screen h-screen  p-4 lg:p-16  flex flex-col justify-center items-center">
        <h2 className="text-8xl text-gray-600 font-bold m-16">How It Works</h2>

        <img src="/howItWorksBG.png" alt="" className="w-[1020px]" />
      </div>
    </div>
  );
};

export default mainPage;
