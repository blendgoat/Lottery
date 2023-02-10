import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
// import Drawer from "../components/Drawer";
import { ConnectWallet } from "@thirdweb-dev/react";
import Head from "next/head";
import NProgress from "nprogress";
import Router from "next/router";
import { useMetamask } from "@thirdweb-dev/react";
// import algoliasearch from "algoliasearch";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import { connectSearchBox } from "react-instantsearch-dom";
// import CustomHits from "../components/Search/CustomHits";
// import CustomSearchBox from "./Search/CustomSearchBox";
import Image from "next/image";

import styles from "../styles/Home.module.css";

const style = {
  wrapper: `bg-slate-800  w-screen px-[1.2rem] py-[0.8rem] items-center flex h-20  `,
  logoContainer: `flex items-center cursor-pointer`,
  logoText: ` ml-[0.8rem] text-black font-semibold text-2xl`,
  connect: `mb-2rem w-[230px]`,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem]  w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[black] placeholder:text-[#8a939b]`,
  headerItems: ` flex items-center justify-end`,
  headerItem: `text-[#5271ff] px-4 font-bold  hover:text-white cursor-pointer`,
  headerIcon: `text-[#5271ff] text-3xl font-black px-4 hover:text-white cursor-pointer`,
  infoContainer: `relative h-20 bg-[white] p-4 rounded-b-lg flex items-center text-white shadow-2xl`,
  button: `mr-8 flex w-[300px]]  justify-center items-center py-4 px-40 bg-slate-600  text-white rounded-lg cursor-pointer shadow-2xl`,
  buttonText: `  text-lg font-semibold   `,
};

const Header = ({ setIsOpen, refine }) => {
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  Router.events.on("routeChangeStart", (url) => {
    console.log("route is changing");
    // NProgress.start();
    setLoading(true);
  });

  Router.events.on("routeChangeComplete", (url) => {
    console.log("route is ended");
    // NProgress.set(0.4);
    setLoading(false);
  });

  //   const searchClient = algoliasearch(
  //     "YKR89ZDX1N",
  //     "da45d5ef8287bab3b94f7f3ce0b5ced0"
  //   );

  return (
    <div className={style.wrapper}>
      <div>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </div>
      <Link href="/">
        <div className={style.logoContainer}>
          <Image
            src="/bullionDaoLargerBullion.png"
            alt="Bullion DAO Logo"
            width={200}
            height={200}
            style={{ objectFit: "contain" }}
          />

          {/* <div className={style.logoText}>bullionDao</div> */}
        </div>
      </Link>
      <>
        {/* <InstantSearch searchClient={searchClient} indexName="bulltest"> */}
        <div className="z-50 mt-2 w-full p-5"></div>
        {/* </InstantSearch> */}
      </>
      <div className="mr-8">
        <div className={style.connect}>
          <ConnectWallet />
          {/* <ConnectWallet
            accentColor="#cbd5e1"
            colorMode="dark"
            rounded="full"
            hieght="10px"
          /> */}
        </div>
      </div>
      <div className={style.headerItems}>
        <Link href="/">
          <div
            // onClick={() => {
            //   const your_url = "/Token";
            //   window.location.href = your_url;
            // }}
            className={style.headerItem}
          >
            <div>HOME</div>
          </div>
        </Link>
      </div>

      <div className={style.headerItems}>
        <Link href="/Dao">
          <div
            onClick={() => {
              // const your_url = "/Dao";
              // window.location.href = your_url;
            }}
            className={style.headerItem}
          >
            <div>DAO</div>
          </div>
        </Link>
      </div>
      {/* <div className={style.headerItems}>
        <div className={style.headerIcon} onClick={() => setIsOpen(true)}>
          <MdOutlineAccountBalanceWallet />
        </div>
        <div className={style.headerIcon} onClick={() => setIsOpen(true)}>
          <ConnectWallet />
        </div>
      </div> */}
    </div>
  );
};

export default Header;
