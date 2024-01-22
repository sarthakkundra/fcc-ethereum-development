// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const ethers = require("hardhat");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

async function main() {
	const simpleStorage = await hre.ethers.deployContract("SimpleStorage");
	await simpleStorage.waitForDeployment();
	console.log("Deployed contract at: ", simpleStorage.target);
	if (process.env.ETHERSCAN_API_KEY) {
		await simpleStorage.deploymentTransaction().wait(6);
		console.log("VERIFYING CONTRACT......");
		await verify(simpleStorage.target, []);
	}
}

async function verify(address, args) {
	try {
		await hre.run("verify:verify", {
			address,
			constructorArguments: args,
		});
	} catch (error) {
		if (error.message.toLowerCase().includes("already verified")) {
			console.log("ALREADY VERIFIED!");
		} else {
			console.error(error);
		}
	}
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
