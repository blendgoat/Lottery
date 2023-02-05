import React from "react";

const style = {
  wrapper: `relative h-full w-full bg-indigo-900 flex flex-col items-center  `,
  container: `container m-4 h-64 mt-96 w-[500px] bg-indigo-900 shadow-xl flex-col flex items-center rounded   justify-center`,
  contentWrapper: `flex h-screen relative justify-center flex-wrap items-center`,
  topContent: `flex items-center justify-center`,

  detailsContainer: `w-[500px] text-[#5271ff] ml-4 p-8 overflow-scroll   m-8 card rounded-lg h-48 shadow-xl items-center bg-indigo-900 `,
  nftImgContainer: `w-[500px] text-[#5271ff] p-8 m-8 card shadow-xl bg-indigo-900 border-black rounded-lg h-48 items-center `,
  timeContainer: `container justify-center w-full bg-indigo-900 shadow-xl rounded-lg mt-48  items-center p-2 h-64 flex`,
  ethcontainer: ` max-w-[280px] flex-1  mr-2 items-center justify-center `,
  ethLogo: `items-center justify-center`,
  ethPotBalance: `items-center text-9xl text-white/75  mr-32 font-bold`,
  button: ` flex shadow-xl mb-24 w-4/5 bg:white hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500  mt-24 p-[0.8rem]  items-center justify-center h-16  rounded-lg cursor-pointer text-black`,
  buttonText: ` text-xl font-semibold p-3 text-slate-200 hover:text-slate-400   `,
  searchBar: `relative flex flex-1 my-[0.8rem] w-max-[520px] h-6  items-center bg-lime-500 rounded-[0.8rem] `,
  searchBarClosed: `relative flex flex-1 my-[0.8rem] w-max-[520px] h-6  items-center bg-red-500 rounded-[0.8rem] `,
};

const Sendingtransaction = () => {
  return <div className={style.container}>Sending Transaction</div>;
};

export default Sendingtransaction;
