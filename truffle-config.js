
const HDWalletProvider = require("@truffle/hdwallet-provider");
const keys = require("./keys.json");

module.exports = {
  contracts_build_directory: "./public/contracts",
  networks: {
    development: {
     host: "172.18.32.1",
     port: 7545,
     network_id: "*",
    },
    goerli: {
      provider: () => 
      new HDWalletProvider(
        keys.PRIVATE_KEY,
        keys.INFURA_GOERLI_URL
      ),
      network_id: 5,
      gas: 5500000,
      gasPrice: 12111643628,
      confirmations: 2,
      timeoutBlocks: 200
    }
  },
  compilers: {
    solc: {
      version: "0.8.10",
    }
  },
};
