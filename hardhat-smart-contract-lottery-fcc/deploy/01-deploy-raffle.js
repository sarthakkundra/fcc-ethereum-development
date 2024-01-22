const { network } = require("hardhat");
const {
	developmentNetworks,
	networkConfig,
} = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
	const { deploy, log, get } = deployments;
	const { deployer } = await getNamedAccounts();
	const chainId = network.config.chainId;
	const networkName = network.name.toLowerCase();

	let vrfCoordinatorV2Address,
		subscriptionId,
		keyHash,
		entranceFee,
		callbackGasLimit,
		interval;

	if (developmentNetworks.includes(networkName)) {
		const vrfCoordinatorV2Mock = await ethers.getContract(
			"VRFCoordinatorV2Mock"
		);
		vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address;
		const transactionResponse = await vrfCoordinatorV2Mock.createSubscription();
		const transactionReceipt = await transactionResponse.wait(1);
		subscriptionId = transactionReceipt.events[0].args.subId;
		await vrfCoordinatorV2Mock.fundSubscription(
			subscriptionId,
			ethers.utils.parseEther("2")
		);
	} else {
		vrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"];
		subscriptionId = networkConfig[chainId]["subscriptionId"];
	}

	console.log("VRF COORDINATOR V2 ADDRESS ", vrfCoordinatorV2Address);

	keyHash = networkConfig[chainId]["keyHash"];
	entranceFee = networkConfig[chainId]["entranceFee"];
	callbackGasLimit = networkConfig[chainId]["callbackGasLimit"];
	interval = networkConfig[chainId]["interval"];

	const args = [
		entranceFee,
		vrfCoordinatorV2Address,
		subscriptionId,
		keyHash,
		callbackGasLimit,
		interval,
	];
	console.log("ENTRANCE FEE ", entranceFee);
	const raffle = await deploy("Raffle", {
		from: deployer,
		args,
		log: true,
		waitForConfirmations: network.config.blockConfirmations || 2,
	});
};
