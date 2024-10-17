require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("@nomicfoundation/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
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
	},
	namedAccounts: {
		deployer: {
			default: 0, // here this will by default take the first account as deployer
			1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
		},
	},
};
