import React from "react";
import Link from "next/link";

const style = {
  logoContainer: ` flex h-[30px] items-center justify-center cursor-pointer`,
  connect: `m-2 w-[230px]`,
  headerItems: ` flex items-center justify-end mr-8`,
  headerItem: `text-[#5271ff] px-4 font-bold my-2  hover:text-white cursor-pointer`,
};

const Footert = () => {
  return (
    <div className="relative flex md:flex-row  justify-center p-4 bg-gray-50 gap-6">
      <div>
        <a
          target="_blank"
          href="https://discord.gg/yQr9MAxVDB"
          rel="noopener noreferrer"
        >
          <img
            src="/discord-logo.png"
            alt="discord"
            className="w-[70px]   h-[30px] object-contain cursor-pointer"
          />
        </a>
      </div>
      <div>
        <a
          target="_blank"
          href="https://twitter.com/bullionDAO"
          rel="noopener noreferrer"
        >
          <img
            src="/logo-twitter.png"
            alt="twitter"
            className="w-[70px]   h-[30px] object-contain cursor-pointer"
          />
        </a>
      </div>
      <div>
        <a
          target="_blank"
          href="https://instagram.com/bullionDAO"
          rel="noopener noreferrer"
        >
          <img
            src="/logo-ig.png"
            alt="instagram"
            className="w-[70px]   h-[30px] object-contain cursor-pointer"
          />
        </a>
      </div>
    </div>
  );
};

export default Footert;
