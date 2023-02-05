import React from "react";

const style = {
  popUp: ` z-10 flex h-full w-full absolute  justify-center backdrop-blur-sm`,
  //   popUpInner: `w-full p-5 max-w-screen-sm relative items-center  bg-white rounded-[20px]`,
};

function Popup(props) {
  return props.trigger ? (
    <div className={style.popUp}>
      <div className={style.popUpInner}>{props.children}</div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
