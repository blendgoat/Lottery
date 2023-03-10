import React from "react";

const teamMembers = [
  {
    name: "Delnoi Otsemobor",
    role: "Founder & CTO",
    bio: "At Bullion Foundation, Delnoi serves as our Founder & CTO, leading the development of our smart contracts and DApps. His contributions are integral to all of our application projects. Delnoi is a passionate learner and experimenter, always seeking out new languages and techniques for online technology development. He is proficient in several languages, including HTML, CSS, JavaScript, and Solidity. His love for technology and the web3 space drives him to explore and tinker with emerging technologies to build innovative and cutting-edge dapps that are both highly functional and simple to use. We are fortunate to have Delnoi as a member of our team, as his skills and dedication to the industry have been invaluable to us. His passion for technology and desire to drive the industry forward has inspired us all to keep pushing the boundaries of what's possible in the web3 space.",

    image: "/delpropic.png",
  },
  // { name: "Jane Smith", role: "CFO", image: "/logoHome.png" },
  // {
  //   name: "Create Your Proposal",
  //   role: "Marketing Director",
  //   image: "/logoHome.png",
  // },
];

const contractAddresses = [
  {
    name: "Game Contract",
    address: "0xeE3583630f0052B363c7Ad90F46346f1Bb004F73",
  },
  {
    name: "DAO Contract",
    address: "0xCeA9eB15EF690Bc031BcA650673c925f6cB27c12",
  },
  {
    name: "DAO Membership Contract",
    address: "0xa85caec09986d1AC483709A960bD1cCa972E3c44",
  },
  {
    name: "DAO Voting Token Contract",
    address: "0xf9fAa5973C6cb15d0aAB2b9ED0eC37E0A6BaD031",
  },
];

const powerPoints = [
  {
    name: "Join Our DAO Community",
    shortDesc:
      "The DAO represents a significant value proposition for our platform. As a member, you will have the power to create proposals and vote on them, contributing to the betterment of our game and the support of various projects. Notably, 10% of every pot will be distributed equally among DAO members, reinforcing the benefits of membership. We are pleased to provide a unique and compelling opportunity for our valued members to engage with our platform and to help shape its future.",
    image: "/logoHome.png",
  },
  {
    name: "Mint DAO Membership",
    shortDesc:
      "To join the DAO, you'll need to mint a DAO membership. DAO memberships cost 1BNB. When you mint your membership, 100% of the funds go directly into the DAO treasury, which is controlled by members like you.",
    image: "/logoHome.png",
  },
  {
    name: "Create a Proposal",
    shortDesc:
      "To create a proposal, you'll need at least 1000BNG tokens. The first 1,000 members will receive 1000BNG tokens via airdrop for free! After that, you can get the tokens on Pancake Swap and other exchanges. To make sure that proposals are fair, we require a 60% quorum to pass, and we only allow a maximum of five proposals at a time. We're excited to see all the great ideas you'll come up with and can't wait to have you join our community!",
    image: "/logoHome.png",
  },
];

const CryptoGame = () => {
  return (
    <div className="relative snap-y snap-mandatory overflow-scroll bg-gray-50 h-screen md:h-screen lg:h-screen  justify-center bg-fixed">
      <div className="fixed h-screen md:h-screen w-screen flex items-center lg:h-full">
        <div className="absolute top-0 -left-4 w-[320px] h-[320px] lg:w-[720px] lg:h-[720px] bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob "></div>
        <div className="absolute top-0 -right-4 w-[320px] h-[320px] lg:w-[720px] lg:h-[720px] bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-[320px] h-[320px] lg:w-[720px] lg:h-[720px] bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="lg:m-8 m-4 relative space-y-4"></div>
      </div>
      <div className="relative snap-start  h-full  p-4 lg:p-16  flex flex-col justify-center items-center">
        <h2 className="text-8xl  text-gray-600 font-bold m-8 lg:m-16">About</h2>
        <div className="flex lg:text-xl text-[8px] flex-col lg:flex-row justify-center w-4/5">
          <div className=" text-gray-900 m-4">
            Our mission is to provide an exciting and fair gaming experience
            while giving back to the community through charitable donations. We
            believe in the power of blockchain and decentralization to create a
            more equitable and transparent world, and we strive to reflect these
            values in everything we do.
          </div>
          <div className=" text-gray-900 m-4">
            Our game is simple and easy to play. With no need to choose numbers,
            all you have to do is click the enter button to join the game. A
            small fee of 0.01 BNB is charged and added to the pot, which grows
            as more players enter. The game remains open for 7 days, after which
            it will close, select a winner in a provably random way, pay out the
            winner, and reset the game. To improve your chances you may enter as
            many times as you want. There is a platform fee of 0.001BNB on every
            transaction(??? $0.30)
          </div>
          <div className=" text-gray-900 m-4">
            What's more, we want to assure you that at no point are your funds
            held by the company, all game funds are held by the contract. The
            pot is split in a way that benefits everyone involved. 70% goes to
            the lucky winner, 20% is deposited to the DAO treasury (where
            members can decide how the funds are distributed) for marketing and
            other DAO operations. 10% is distributed amongst all DAO members. We
            want you to be a part of this incredible journey and make a
            difference in the world. Join us now and be a part of something
            amazing!
          </div>
        </div>
      </div>
      <div className="relative snap-start w-screen h-full  p-4 lg:p-16  flex flex-col justify-center items-center">
        <h2 className="lg:text-8xl text-4xl  text-gray-600 font-bold lg:m-16 m-8  ">
          DAO Structure
        </h2>
        <img src="/daoStructure.png" alt="" className="w-[1020px]" />
      </div>
      <div className="relative snap-start w-screen h-full  p-4 lg:p-16  flex flex-col justify-center items-center">
        <h2 className="lg:text-8xl text-4xl  text-gray-600 font-bold lg:m-16 m-8 ">
          Asset Distribution
        </h2>

        <section className="flex lg:m-8  lg:text-lg text-[8px] text-gray-600  flex-row justify-center w-4/5">
          <h2 class="text-2xl text-gray-300 font-bold mb-2"></h2>
          <div>
            The Bullion DAO is a winner-takes-all game combined with a
            technology development-focused DAO. The platform is designed to fund
            Web3 development programs, support charitable initiatives on
            existing global issues, and invest in blockchain tech companies and
            technology.
          </div>
        </section>
        <div className="flex lg:text-lg text-[8px] text-gray-600 mt-2 flex-col  lg:flex-row justify-center w-4/5">
          <section class="lg:mb-8  mb-2">
            <h2 class="lg:text-2xl text-sm font-bold lg:mb-2">
              DAO Membership
            </h2>
            <div class="mb-2 lg:mb-8 w-4/5  ">
              Membership pass gives users access to the DAO and all its
              functions. DAO member rewards are also distributed according to
              how many passes are owned as a percentage of total passes. The
              Bullion Foundation retains 1,000 passes.
            </div>
            <h3 class="lg:text-xl  text-l font-bold">Private Sale:</h3>
            <ul class="list-disc w-4/5  pl-6 mb-2 lg:mb-8">
              <li>
                1,000 passes will be distributed among early partners and
                investors via a whitelist presale.
              </li>
              <li>
                An additional 1,000 passes will be airdropped to early game
                players.
              </li>
            </ul>

            <h3 class="lg:text-xl text-l font-bold">Public Sale:</h3>
            <div class="mb-2 ">
              <ul class="list-disc w-3/4  pl-6 lg:mb-8 mb-2">
                <li>
                  7,000 passes will be available for purchase at 1 BNB plus a
                  10% plattform fee(??? $30).
                </li>
              </ul>
            </div>

            <h3 class="lg:text-xl text-l font-bold">
              Distribution of Initial Sale Proceeds:
            </h3>
            <ul class="list-disc  pl-6">
              <li>
                100% of the Proceeds from the initial sale will be sent the DAO
                Treasury.
              </li>
            </ul>
          </section>
          <section>
            <h2 class="lg:text-2xl text-sm font-bold   lg:mb-2">
              BNGX Governance Token Distribution
            </h2>
            <div class="mb-2 lg:mb-8 ">
              Bullion Governance tokens are required to vote or create
              proposals. The Bullion Foundation will airdrop BNGX governance
              tokens to early pass holders and users. The max supply of BNGX is
              100,000,000.
            </div>

            <h3 class="lg:text-xl text-l font-bold  ">Private Sale:</h3>
            <ul class="list-disc lg:mb-8  pl-6 ">
              <li>
                5,000,000 BNGX will be deposited to the Bullion DAO Treasury.
              </li>
              <li>3,000,000 BNGX will be witheld by the Bullion Foundation.</li>
              <li>
                2,000,000 BNGX will be airdropped to early players and DAO
                members (1,000 each).
              </li>
              <li>5,000,000 BNGX will be distributed to contributors.</li>
            </ul>

            <div>
              <h3 class="lg:text-xl text-l font-bold  ">Public Sale:</h3>
              <ul class="list-disc  pl-6">
                <li>
                  85,000,000 BNGX will be distributed through an ICO and
                  listing.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
      <div className="relative snap-start w-screen h-full  p-4 lg:p-16  flex flex-col justify-center items-center">
        <div className="flex lg:text-xl text-[8px] text-gray-600  flex-col justify-center w-4/5">
          <section>
            <h2 class="lg:text-8xl text-4xl  text-gray-600 font-bold lg:m-16 m-8 ">
              DAO Voting
            </h2>
            <div class="mb-2 ">
              The DAO dao is set up with a 60% voting quorum, this means that a
              total of 60% of all votes is required for proposals to pass.
              Members are required to be holding 1,000 BNGX and a membership
              token in order to create proposals and vote. The 60% requirement
              helps to secure the DAO and its treasury from harmful proposals
              until a meaningful number of participants are involved.
            </div>
          </section>
        </div>
      </div>
      <div className="relative snap-start w-screen h-full  p-4 lg:p-16  flex flex-col justify-center items-center">
        <h2 className="lg:text-8xl text-4xl  text-gray-600 font-bold lg:m-16 m-8 ">
          Smart Contract Addreses
        </h2>
        <div className="flex lg:text-xl text:xs text-gray-200  flex-col justify-center w-4/5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-8 gap-4">
            {contractAddresses.map((contract) => (
              <div
                key={contract.name}
                className="bg-gray-900 bg-opacity-30 overflow-hidden shadow rounded-lg"
              >
                <div className="px-4 py-4">
                  <h3 className="text-lg text-base font-bold  mb-2">
                    {contract.name}
                  </h3>
                  <div className="lg:text-base text-[8px]">
                    Contract Address: {contract.address}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative snap-start w-screen h-full  p-4 lg:p-16  flex flex-col justify-center items-center">
        <div className="flex lg:text-[12px] text-[8px] text-gray-200  flex-col justify-center w-4/5">
          <div className="grid grid-cols-1 md:grid-cols-3  gap-4">
            {powerPoints.map((powerPoints, Id) => (
              <div
                key={powerPoints.name}
                className="bg-gray-900 bg-opacity-30 overflow-hidden shadow lg:p-8 p-2 rounded-lg"
              >
                <div class="flex-shrink-0 lg:mt-4 ml-4">
                  <img
                    class="lg:h-12 lg:w-12 h-6 w-6 lg:mb-8"
                    src={powerPoints.image}
                    alt={powerPoints.name}
                  />
                </div>

                <div className="lg:px-4 lg:py-4 px-2 py-2 lg:mb-4 mb-2">
                  <h3 className="lg:text-lg text-sm font-bold  mb-2">
                    {powerPoints.name}
                  </h3>
                  <div className="">{powerPoints.shortDesc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative snap-start w-screen h-full  p-4 lg:p-16  flex flex-col justify-center items-center">
        <h2 className="lg:text-8xl text-4xl  text-gray-600 font-bold lg:m-16 m-8 ">
          Our Team
        </h2>
        <div className="flex lg:text-[12px] text-[8px] text-gray-200  flex-col justify-center lg:items-center w-4/5">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:flex lg:flex-shrink-0 lg:w-4/5 lg:justify-center lg:items-center  gap-4">
            {teamMembers.map((member, id) => (
              <div
                key={member.name}
                className="bg-gray-900 bg-opacity-30 overflow-hidden shadow lg:p-8 p-2 rounded-lg"
              >
                <div class="flex-shrink-0 lg:mt-4 ml-4">
                  <img
                    class="h-16 w-16 rounded-full lg:mb-8"
                    src={member.image}
                    alt={member.name}
                  />
                </div>

                <div className="px-4">
                  <h3 className="text-lg font-bold  mb-2">{member.name}</h3>
                  <h3 className="text-base font-bold  mb-2">{member.role}</h3>
                  <div className="">{member.bio}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CryptoGame;
