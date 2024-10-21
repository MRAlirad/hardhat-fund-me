require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("@nomicfoundation/hardhat-ethers");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const COINMARKEYCAP_API_KEY = process.env.COINMARKEYCAP_API_KEY || "";

module.exports = {
	solidity: "0.8.8",
	// solidity: {
	// 	compilers: [{ version: "0.8.8" }, { version: "0.6.6" }], // handle multiple solidity versions
	// },
	networks: {
		hardhat: {
			chainId: 31337,
			// gasPrice: 130000000000,
		},
		sepolia: {
			url: SEPOLIA_RPC_URL,
			accounts: [PRIVATE_KEY],
			chainId: 11155111,
			blockConfirmations: 6, //! how many blocks we want to wait
		},
	},
	etherscan: {
		apiKey: ETHERSCAN_API_KEY, //! used for verification by hardhat-verify through etherscan
	},
	gasReporter: {
		enabled: true, //! to show the gas reporter in your terminal
		outputFile: "gas-reporter.txt", //! to output the gas reporter in to a .txt file
		noColors: true,
		currency: "USD",
		coinmarketcap: COINMARKEYCAP_API_KEY, //! the API given from https://coinmarketcap.com
		token: "MATIC", //! to deploy in diffrent network
	},
	namedAccounts: {
		deployer: {
			default: 0, //! here this will by default take the first account as deployer
			1: 0, //! similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
		},
	},
};
