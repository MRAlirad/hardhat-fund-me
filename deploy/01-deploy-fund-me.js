const {
	networkConfig,
	developmentChains,
} = require("../helper-hardhat-config");
const { network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
	// we have access to hre (hardhat runtime environment) when "npx hardhat deploy" script runs
	const { deploy, log } = deployments;
	const { deployer } = await getNamedAccounts();
	const chainId = network.config.chainId;

	let ethUsdPriceFeedAddress;

	if (developmentChains.includes(network.name)) {
		const ethUsdAggregator = await deployments.get("MockV3Aggregator");
		ethUsdPriceFeedAddress = ethUsdAggregator.address;
	} else {
		ethUsdPriceFeedAddress = networkConfig[chainId].ethUstPriceFeed;
	}

	// if the contract doesn't exist, we deploy a minimal version of for out local testing

	// well what happens when we want to change chains
	// when going for localhost or hardhat network we want to use a mock

	// name of the contract
	const fundMe = await deploy("FundMe", {
		// the list of the override we want to add
		from: deployer,
		args: [ethUsdPriceFeedAddress], // put price feed address,
		log: true,
	});
	log("------------------------------");
};

module.exports.tags = ["all", "fundme"];
