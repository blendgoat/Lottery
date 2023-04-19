import React, { useContract } from "@thirdweb-dev/react";
import { useContext, useState } from "react";
import { ApeDaoContext } from "../components/Context/solutions";
import Popup from "./Popup";
import Sendingtransaction from "./Home/Sendingtransaction";
const style = {
  wrapper: `relative w-screen h-full bg-indigo-900 flex flex-col items-center  `,
  mintwrapper: `h-screen p-2 w-full bg-indigo-900 flex justify-center flex-col items-center  `,
  mintButton: ` flex shadow-xl mt-8  w-[320px] lg:w-[600px] bg-indigo-700 hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500 p-[0.8rem]  items-center justify-center h-16  rounded-lg cursor-pointer text-black`,
  buttonText: ` text-xl font-semibold p-3 text-slate-200 hover:text-slate-400   `,
};

const Mintcompo = () => {
  const [buttonPop, setButtonPop] = useState(false);

  const { address } = useContext(ApeDaoContext);

  const { contract: editionDrop } = useContract(
    "0x7CF4e5794087691637d421B6FD304112fB190dB6",
    "edition-drop"
  );

  const listAmKpa = () => {
    setButtonPop(true);
  };

  const closePop = () => {
    setButtonPop(false);
  };

  const minIt = async () => {
    try {
      const tokenId = 0;
      const quantity = 1;

      const tx = await editionDrop.claimTo(address, tokenId, quantity);
      closePop();
      const receipt = tx.receipt;
    } catch (error) {
      console.log({ error });
      closePop();
    }
    // window.location.reload();
  };

  return (
    <div className={style.mintwrapper}>
      <Popup trigger={buttonPop}>
        <div className="w-full">
          <Sendingtransaction />
        </div>
      </Popup>
      {/* <MediaRenderer
            src={NftImage.animation_url}
            className={style.nftImg}
            /> */}
      <h1>Mint 🍪DAO Membership</h1>
      <button
        onClick={() => {
          minIt();
          listAmKpa();
        }}
        className={style.mintButton}
      >
        Mint
      </button>
    </div>
  );
};

export default Mintcompo;
