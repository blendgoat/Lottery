// import { ThirdwebStorage } from "@thirdweb-dev/storage";
const ThirdwebStorage = require("@thirdweb-dev/storage");

// First, instantiate the SDK
const storage = new ThirdwebStorage();

const metadata = {
  name: "BullionVoteFinalIni",
  voting_delay_in_blocks: 0,
  voting_period_in_blocks: 8600,
  voting_token_address: "",
  voting_quorum_fraction: 0,
  proposal_token_threshold: "1000",
  trusted_forwarders: [],
};

const uri = await storage.upload(metadata);
// This will log a URL like ipfs://QmWgbcjKWCXhaLzMz4gNBxQpAHktQK6MkLvBkKXbsoWEEy/0
console.log(uri);
