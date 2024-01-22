require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
module.exports = {
	solidity: "0.8.7",
	defaultNetwork: "hardhat",
	networks: {
		sepolia: {
			url: RINKEBY_RPC_URL,
			accounts: [PRIVATE_KEY],
			chainId: 11155111,
		},
	},
	etherscan: {
		apiKey: ETHERSCAN_API_KEY,
	},
	sourcify: {
		enabled: true,
	},
};
