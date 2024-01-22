const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();

async function main() {
	const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
	const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

	const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
	const binary = fs.readFileSync(
		"./SimpleStorage_sol_SimpleStorage.bin",
		"utf8"
	);

	const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
	const contract = await contractFactory.deploy();
	await contract.deployTransaction.wait(1);

	const currentFavouriteNumber = await contract.retrieve();
	console.log("Current Fav Number: ", currentFavouriteNumber.toString());

	const transactionResponse = await contract.store("21");
	const transactionReceipt = await transactionResponse.wait(1);
	const updatedFavouriteNumber = await contract.retrieve();
	console.log("Updated Fav Number: ", updatedFavouriteNumber.toString());
}

main()
	.then(() => {
		console.log("CONTRACT DEPLOYED!!!!");
	})
	.catch((err) => {
		console.log("HEREEEEEEEE");
		console.error(err);
	});
