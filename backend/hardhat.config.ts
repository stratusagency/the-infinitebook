import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";

require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
  },
  networks: {
    // for testnet
    "base-goerli": {
      url: "https://goerli.base.org",
      accounts: [process.env.WALLET_KEY as string],
    },
    // for local dev environment
    "base-local": {
      url: "http://localhost:8545",
      accounts: [process.env.WALLET_KEY as string],
    },
  },
  // Hardhat expects etherscan here, even if you're using Blockscout.
  etherscan: {
    apiKey: {
      // Uncomment for Blockscout
      // No api key is needed for Basescan
      // Blockscout
      // "base-goerli": process.env.BLOCKSCOUT_KEY as string
    },
    customChains: [
      {
        network: "base-goerli",
        chainId: 84531,
        urls: {
          apiURL: "https://api-goerli.basescan.org/api",
          browserURL: "https://goerli.basescan.org"
        },
      },
    ],
  },
  defaultNetwork: "hardhat",
};

export default config;
