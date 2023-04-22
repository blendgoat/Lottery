import React from "react";

import { Proposalsubmission, Exploredao, Herodao } from "../sections/daosections";

const Daocompo = () => {
  return (
    <div className="bg-primary-black overflow-hidden">
      <Herodao />
      <div className="relative">
        <Proposalsubmission />
        <div className="gradient-03 z-0" />
        <Exploredao />
      </div>
    </div>
  );
};

export default Daocompo;
