const { ethers } = require("hardhat");

// console.log("HEREEEEE ", ethers);

const networkConfig = {
	31337: {
		name: "hardhat",
		entranceFee: ethers.utils.parseEther("0.01"),
		callbackGasLimit: "500000",
		interval: "30",
	},
	11155111: {
		name: "sepolia",
		vrfCoordinatorV2: "0x8103b0a8a00be2ddc778e6e7eaa21791cd364625",
		keyHash:
			"0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c",
		keepersUpdatedInterval: "30",
		interval: "30",
		entranceFee: ethers.utils.parseEther("0.01"),
		// entranceFee: 10000000,
		callbackGasLimit: "500000",
		subscriptionId: 8599,
	},
};

const developmentNetworks = ["localhost", "hardhat"];

module.exports = {
	networkConfig,
	developmentNetworks,
};
