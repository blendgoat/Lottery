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
    address: "0xd0FCC7Aa1EF5f95278Af3A85cB5e75B0443bda62",
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
          <h1 className="text-3xl font-bold text-gray-200 mb-2">
            Welcome to Bullion DAO
          </h1>
          <p className="text-xl text-gray-500 mb-4">
            Our mission is to provide an exciting and fair gaming experience
            while giving back to the community through charitable donations. We
            believe in the power of blockchain and decentralization to create a
            more equitable and transparent world, and we strive to reflect these
            values in everything we do.
          </p>
          <p className="text-xl text-gray-500 mb-4">
            Our game is simple and easy to play. With no need to choose numbers,
            all you have to do is click the enter button to join the game. A
            small fee of 0.01 BNB is charged and added to the pot, which grows
            as more players enter. The game remains open for 7 days, after which
            it will close, select a winner in a provably random way, pay out the
            winner, and reset the game, giving everyone a fresh chance to win.
            To improve your chances you may enter as many times as you want.
          </p>
          <p className="text-xl text-gray-500 mb-4">
            What's more, we want to assure you that at no point are your funds
            held by the company, all game funds are held by the contract. The
            pot is split in a way that benefits everyone involved. 60% goes to
            the lucky winner, 20% is used for marketing and operations, 10% is
            split between all members of the DAO, and the remaining 10% goes to
            our charity DAO where members can decide how the funds are
            distributed.
          </p>
          <p className="text-xl text-gray-500 mb-4">
            We want you to be a part of this incredible journey and make a
            difference in the world. So why not take a chance and play our game
            today? Remember, not only could you win big, but you'll also be
            contributing to a greater cause. Join us now and be a part of
            something amazing!
          </p>{" "}
          <h2 className="text-2xl font-bold text-gray-200 mb-8 mt-16">
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
                  <p className="text-gray-500">
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
