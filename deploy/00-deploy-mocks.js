const { network } = require("hardhat");
const {
	developmentChains,
	DECIMALS,
	INITIAL_ANSWER,
} = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
	// we have access to hre (hardhat runtime environment) when "npx hardhat deploy" script runs
	const { deploy, log } = deployments;
	const { deployer } = await getNamedAccounts();
	// const chainId = network.config.chainId;

	if (developmentChains.includes(network.name)) {
		log("local network detected! Deploying mocks...");
		await deploy("MockV3Aggregator", {
			contract: "MockV3Aggregator",
			from: deployer,
			log: true,
			args: [DECIMALS, INITIAL_ANSWER],
		});
		log("Mocks deployed");
		log("--------------------------");
	}
};

// is there a way that we can run only our deploy mock script?
module.exports.tags = ["all", "mocks"];
