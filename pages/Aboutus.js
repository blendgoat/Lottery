import React from "react";

const teamMembers = [
  {
    name: "Delnoi Otsemobor",
    role: "CTO",
    image: "/logoHome.png",
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
    role: "The DAO represents a significant value proposition for our platform. As a member, you will have the power to create proposals and vote on them, contributing to the betterment of our game and the support of various projects. Notably, 10% of every pot will be distributed equally among DAO members, reinforcing the benefits of membership. We are pleased to provide a unique and compelling opportunity for our valued members to engage with our platform and to help shape its future.",
    image: "/logoHome.png",
  },
  {
    name: "Mint DAO Membership",
    role: "To join the DAO, you'll need to mint a DAO membership. DAO memberships cost 1BNB. When you mint your membership, 50% of the funds will go into the DAO treasury, which is controlled by members like you, and the other 50% will cover operational expenses.",
    image: "/logoHome.png",
  },
  {
    name: "Create a Proposal",
    role: "To create a proposal, you'll need at least 1000BNG tokens. The first 1,000 members will receive 1000BNG tokens via airdrop for free! After that, you can get the tokens on Pancake Swap and other exchanges. To make sure that proposals are fair, we require a 60% quorum to pass, and we only allow a maximum of five proposals at a time. We're excited to see all the great ideas you'll come up with and can't wait to have you join our community!",
    image: "/logoHome.png",
  },
];

const CryptoLottery = () => {
  return (
    <div className="bg-indigo-900">
      <div className="mx-auto w-4/5 px-4 sm:px-6  lg:px-8">
        <div className="py-8">
          <h1 className="text-3xl font-bold text-gray-200 mt-24 mb-2">
            Welcome to Bullion DAO
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            Our mission is to provide an exciting and fair gaming experience
            while giving back to the community through charitable donations. We
            believe in the power of blockchain and decentralization to create a
            more equitable and transparent world, and we strive to reflect these
            values in everything we do.
          </p>
          <p className="text-xl text-gray-300 mb-4">
            Our game is simple and easy to play. With no need to choose numbers,
            all you have to do is click the enter button to join the game. A
            small fee of 0.01 BNB is charged and added to the pot, which grows
            as more players enter. The game remains open for 7 days, after which
            it will close, select a winner in a provably random way, pay out the
            winner, and reset the game. To improve your chances you may enter as
            many times as you want.
          </p>
          <p className="text-xl text-gray-300 mb-4">
            What's more, we want to assure you that at no point are your funds
            held by the company, all game funds are held by the contract. The
            pot is split in a way that benefits everyone involved. 60% goes to
            the lucky winner, 20% is used for marketing and operations, 10% is
            split between all members of the DAO, and the remaining 10% goes to
            our charity DAO where members can decide how the funds are
            distributed.
          </p>
          <p className="text-xl text-gray-300 mb-4">
            We want you to be a part of this incredible journey and make a
            difference in the world. So why not take a chance and play our game
            today? Remember, not only could you win big, but you'll also be
            contributing to a greater cause. Join us now and be a part of
            something amazing!
          </p>{" "}
          <h1 className="text-3xl font-bold mt-24 text-gray-300 mb-2">
            White Paper
          </h1>
          <section class="mb-8">
            <h2 class="text-2xl text-gray-300 font-bold mb-4"></h2>
            <p class="mb-2 text-xl text-gray-300">
              The Bullion DAO is a winner-takes-all game combined with a Web3
              development-focused DAO. The platform is designed to fund Web3
              development programs, support charitable initiatives on existing
              global issues, and invest in blockchain tech companies and
              technology.
            </p>
          </section>
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-300 mt-16 mb-4">
              DAO Membership
            </h2>

            <div class="mb-4">
              <h3 class="text-xl font-bold text-gray-300 mb-2">
                Private Sale:
              </h3>
              <ul class="list-disc text-xl text-gray-300 pl-6 mb-2">
                <li>
                  1,000 passes will be distributed among early partners and
                  investors via a whitelist presale, with a maximum of 100
                  passes apportioned to Bullion Foundation.
                </li>
                <li>
                  An additional 1,000 passes will be airdropped to early game
                  players.
                </li>
              </ul>
            </div>

            <div class="mb-4  mt-8">
              <h3 class="text-xl text-gray-300 font-bold mb-2">Public Sale:</h3>
              <p class="mb-2 text-gray-300 text-xl">
                8,000 passes will be available for purchase at 1 BNB
                (approximately $300).
              </p>
            </div>
            <div class="mt-8">
              <h3 class="text-xl text-gray-300 font-bold mb-2">
                Distribution of Initial Sale Proceeds:
              </h3>
              <ul class="list-disc text-xl text-gray-300 pl-6">
                <li>
                  50% of the Proceeds from the initial sale will be sent the DAO
                  Treasury.
                </li>
              </ul>
            </div>
          </section>
          <section class="mb-8 mt-16">
            <h2 class="text-2xl text-gray-300 font-bold mb-4">
              BNGX Governance Token Distribution
            </h2>
            <p class="mb-2 text-xl text-gray-300">
              The Bullion DAO will airdrop BNGX governance tokens to early pass
              holders and users. The max supply of BNGX is 100,000,000.
            </p>

            <div>
              <h3 class="text-xl text-gray-300 font-bold mt-8 mb-2">
                Private Sale:
              </h3>
              <ul class="list-disc text-xl text-gray-300 pl-6">
                <li>5,000,000 BNGX will go to the Bullion DAO Treasury.</li>
                <li>3,000,000 BNGX will go to the Bullion Foundation.</li>
                <li>
                  1,000,000 BNGX will be airdropped to early players and DAO
                  members (1,000 each).
                </li>
                <li>5,000,000 BNGX will go to contributors.</li>
                <li>
                  85,000,000 BNGX will be distributed through an ICO and
                  listing.
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-xl text-gray-300 font-bold mt-8 mb-2">
                Public Sale:
              </h3>
              <ul class="list-disc text-xl text-gray-300 pl-6">
                <li>
                  85,000,000 BNGX will be distributed through an ICO and
                  listing.
                </li>
              </ul>
            </div>
          </section>
          <section class="mb-8">
            <h2 class="text-2xl text-gray-300 font-bold mt-16 mb-4">
              DAO Treasury Funding Inflow
            </h2>
            <p class="mb-2 text-xl text-gray-300">
              The initial funding for the DAO will be derived from the
              membership pass sale and BNG token ICO and listing. The DAO will
              also receive funding from 10% of every game pot and returns from
              DAO investment operations.
            </p>
          </section>
          <section>
            <h2 class="text-2xl text-gray-300 font-bold mb-4">DAO Voting</h2>
            <p class="mb-2 text-xl text-gray-300">
              The DAO will be set up with a 60% voting quorum, and 1,000 BNGX
              will be required to create proposals. The 60% requirement helps to
              secure the DAO and its treasury from harmful proposals until a
              meaningful number of participants are involved.
            </p>
          </section>
          <section class="mb-8 mt-16">
            <div>
              <h3 class="text-xl text-gray-300 font-bold mt-8 mb-2">
                Game Pot Splits:
              </h3>
              <ul class="list-disc text-xl text-gray-300 pl-6">
                <li>60% - Winner</li>
                <li>10% - Bullion Foundation</li>
                <li>
                  30% - DAO Treasury(20% -Marketing & DAO operations, 10% -
                  Distributed to DAO members )
                </li>
              </ul>
            </div>
          </section>
          <section class="mb-8 mt-16">
            <div>
              <h3 class="text-xl text-gray-300 font-bold mt-8 mb-2">
                Bullion Foundation:
              </h3>
              <p class="mb-2 text-xl text-gray-300">
                The Bullion foundation is a group of entities which consist of
                the founders, early investors, and contributors .
              </p>
            </div>
          </section>{" "}
          <h2 className="text-2xl font-bold text-gray-300 mb-8 mt-16">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <img className="w-full" src={member.image} alt={member.name} />
                <div className="px-4 py-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-gray-200 mb-2 mt-16">
            Smart Contract Addresses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contractAddresses.map((contract) => (
              <div
                key={contract.name}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="px-4 py-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {contract.name}
                  </h3>
                  <p className="text-gray-500 lg:text-base text-sm">
                    Contract Address: {contract.address}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-gray-200 mb-2 mt-16"></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
            {powerPoints.map((power) => (
              <div
                key={power.name}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div class="flex-shrink-0 mt-4 ml-4">
                  <img
                    class="h-12 w-12 mb-8"
                    src={power.image}
                    alt={power.name}
                  />
                </div>

                <div className="px-4 py-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {power.name}
                  </h3>
                  <p className="text-gray-500">{power.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CryptoLottery;
