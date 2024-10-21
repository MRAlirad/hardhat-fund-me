const {
	networkConfig,
	developmentChains,
} = require("../helper-hardhat-config");
const { network } = require("hardhat");
const { verify } = require("../utils/verify");

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

	const args = [ethUsdPriceFeedAddress]; // put price feed address,

	// name of the contract
	const fundMe = await deploy("FundMe", {
		// the list of the override we want to add
		from: deployer,
		args: args,
		log: true,
		waitConfirmations: network.config.blockConfirmations || 1,
	});

	if (
		!developmentChains.includes(network.name) &&
		process.env.ETHERSCAN_API_KEY
	) {
		await verify(fundMe.target, args);
	}

	log("------------------------------");
};

module.exports.tags = ["all", "fundme"];
