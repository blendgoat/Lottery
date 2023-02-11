import Link from "next/link";
import React, { useState, useEffect } from "react";

// import Drawer from "../components/Drawer";
import { ConnectWallet } from "@thirdweb-dev/react";
import Head from "next/head";
import NProgress from "nprogress";
import Router from "next/router";

import Image from "next/image";
import menu from "../public/menu.svg";
import CustomButton from "./CustomButton";
import styles from "../styles/Home.module.css";

const style = {
  wrapper: `bg-slate-800  w-screen px-[1.2rem] py-[0.8rem] items-center flex h-20  `,
  logoContainer: ` flex h-[30px] items-center justify-center cursor-pointer`,
  logoText: ` ml-[0.8rem] text-black font-semibold text-2xl`,
  connect: `m-2 w-[230px]`,
  navMain: `lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-slate-800 rounded-[100px]`,
  headerItems: ` flex items-center justify-end`,
  headerItem: `text-[#5271ff] px-4 font-bold my-2  hover:text-white cursor-pointer`,
  headerIcon: `text-[#5271ff] text-3xl font-black px-4 hover:text-white cursor-pointer`,
  infoContainer: `relative h-20 bg-[white] p-4 rounded-b-lg flex items-center text-white shadow-2xl`,
  button: `mr-8 flex w-[300px]]  justify-center items-center py-4 px-40 bg-slate-600  text-white rounded-lg cursor-pointer shadow-2xl`,
  buttonText: `  text-lg font-semibold   `,
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
      <div className="sm:flex hidden flex w-full flex-row justify-between">
        <div>
          <img
            src="/logoHome.png"
            alt="menu"
            className="w-[70px] m-4 h-[30px] object-contain cursor-pointer"
          />
        </div>
        <div className="flex">
          <div className="mr-8">
            <div className={style.connect}>
              <ConnectWallet />
            </div>
          </div>

          <div className={style.headerItems}>
            <Link href="/">
              <div className={style.headerItem}>
                <div>HOME</div>
              </div>
            </Link>
          </div>
          <div className={style.headerItems}>
            <Link href="/Dao">
              <div className={style.headerItem}>
                <div>DAO</div>
              </div>
            </Link>
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
          className={`absolute top-[60px] flex right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 px-8 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <div className="w-full flex flex-col items-center justify-center">
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
            <ConnectWallet />
          </div>
        </div>
      </div>
    </div>
    // <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
    //   <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]"></div>
    // </div>
  );
};

export default Header;

// {/* <Link href="/">
// <div className={style.logoContainer}>
//   <Image
//     src="/bullionDaoLargerBullion.png"
//     alt="Bullion DAO Logo"
//     width={200}
//     height={200}
//     style={{ objectFit: "contain" }}
//   />
// </div>
//         </Link>
//         <div className="sm:hidden flex justify-between items-center relative">
//           <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
//             <img
//               src="/bullionDaoLargerBullion.png"
//               alt="user"
//               className="w-[60%] h-[60%] object-contain"
//             />
//           </div>

//           <img
//             src="/bullionDaoLargerBullion.png"
//             alt="menu"
//             className="w-[34px] h-[34px] object-contain cursor-pointer"
//             onClick={() => setToggleDrawer((prev) => !prev)}
//           />

//           <div
//             className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
//               !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
//             } transition-all duration-700`}
//           >
//             {/* <ul className="mb-4">
//               {navlinks.map((link) => (
//                 <li
//                   key={link.name}
//                   className={`flex p-4 ${
//                     isActive === link.name && "bg-[#3a3a43]"
//                   }`}
//                   onClick={() => {
//                     setIsActive(link.name);
//                     setToggleDrawer(false);
//                     navigate(link.link);
//                   }}
//                 >
//                   <img
//                     src={link.imgUrl}
//                     alt={link.name}
//                     className={`w-[24px] h-[24px] object-contain ${
//                       isActive === link.name ? "grayscale-0" : "grayscale"
//                     }`}
//                   />
//                   <p
//                     className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
//                       isActive === link.name
//                         ? "text-[#1dc071]"
//                         : "text-[#808191]"
//                     }`}
//                   >
//                     {link.name}
//                   </p>
//                 </li>
//               ))}
//             </ul> */}

//             <div className="flex mx-4">
//               <CustomButton
//                 btnType="button"
//                 // title={address ? "Create a campaign" : "Connect"}
//                 // styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
//                 handleClick={() => {
//                   if (address) navigate("create-campaign");
//                   else connect();
//                 }}
//               />
//             </div>
//           </div>
//         </div>

// <div className="z-50 mt-2 w-full p-5"></div>
//         <div className="mr-8">
//           <div className={style.connect}>
//             <ConnectWallet />
//           </div>
//         </div>
// <div className={style.headerItems}>
//   <Link href="/">
//     <div className={style.headerItem}>
//       <div>HOME</div>
//     </div>
//   </Link>
// </div>

//         <div className={style.headerItems}>
// <Link href="/Dao">
//   <div className={style.headerItem}>
//     <div>DAO</div>
//   </div>
// </Link>
//         </div>
