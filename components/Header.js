import Link from "next/link";
import React, { useState, useEffect } from "react";

import { ConnectWallet } from "@thirdweb-dev/react";
import Head from "next/head";
import NProgress from "nprogress";
import Router from "next/router";

import Image from "next/image";
import menu from "../public/menu.svg";
import CustomButton from "./CustomButton";
import styles from "../styles/Home.module.css";

const style = {
  logoContainer: ` flex h-[30px] items-center justify-center cursor-pointer`,
  connect: `m-2 w-[230px]`,
  headerItems: ` flex font-sans  items-center justify-end `,
  headerItem: `text-gray-50 px-24 hover:text-gray-900 cursor-pointer`,
};

const Header = ({ setIsOpen, refine }) => {
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [toggleDrawer, SetToggleDrawer] = useState(false);

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
    <div className="flex md:flex-row flex-col-reverse justify-between gap-6">
      <div className="sm:flex hidden flex w-full flex-row fixed z-10 items-center justify-between">
        <div>
          <Link href="/">
            <img
              src="/logoHome.png"
              alt="menu"
              className="w-[70px] ml-2  h-[30px] object-contain cursor-pointer"
            />
          </Link>
        </div>
        <div className="flex">
          <div className={style.headerItems}>
            <Link href="/">
              <div className={style.headerItem}>
                <div className="text-sm">HOME</div>
              </div>
            </Link>
          </div>
          <div className={style.headerItems}>
            <Link href="/Dao">
              <div className={style.headerItem}>
                <div className="text-sm">DAO</div>
              </div>
            </Link>
          </div>
          <div className={style.headerItems}>
            <Link href="/Aboutus">
              <div className={style.headerItem}>
                <div className="text-sm">ABOUT</div>
              </div>
            </Link>
          </div>
          <div className="mr-8">
            <div className={style.connect}>
              <ConnectWallet accentColor="#f9fafb" border-radius="9999px" />
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden flex justify-between px-4 items-center relative">
        <div className={style.logoContainer}>
          <img
            src="/logoHome.png"
            alt="logo"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>

        <img
          src="/menu.svg"
          alt="menu"
          className="w-[14px] h-[14px] object-contain cursor-pointer"
          onClick={() => SetToggleDrawer((prev) => !prev)}
        />
        <div
          className={`absolute top-[60px] flex right-0 left-0 bg-[#1c1c24]  z-10 shadow-secondary py-4 px-8 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <div className="w-full flex flex-col  items-center justify-center">
            <Link href="/">
              <div
                className={style.headerItem}
                onClick={() => {
                  SetToggleDrawer(false);
                }}
              >
                <div>HOME</div>
              </div>
            </Link>

            <Link href="/Dao">
              <div
                className={style.headerItem}
                onClick={() => {
                  SetToggleDrawer(false);
                }}
              >
                <div>DAO</div>
              </div>
            </Link>
            <Link href="/Aboutus">
              <div
                className={style.headerItem}
                onClick={() => {
                  SetToggleDrawer(false);
                }}
              >
                <div>ABOUT</div>
              </div>
            </Link>
            <ConnectWallet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
