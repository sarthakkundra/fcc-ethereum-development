const { network, ethers } = require("hardhat");
const { developmentNetworks } = require("../helper-hardhat-config");

const BASE_FEE = ethers.utils.parseEther("0.25");
const GAS_PRICE_LINK = 1e9;

module.exports = async ({ getNamedAccounts, deployments }) => {
	const { deploy, log } = deployments;
	const { deployer } = await getNamedAccounts();
	const args = [BASE_FEE, GAS_PRICE_LINK];

	const chainId = network.config.chainId;

	if (developmentNetworks.includes(network.name)) {
		await deploy("VRFCoordinatorV2Mock", {
			from: deployer,
			args,
			log: true,
			waitForConfirmations: 1,
		});
	}
	console.log("DEPLOYED MOCKS!!!!");
};

module.exports.tags = ["all", "mocks"];
