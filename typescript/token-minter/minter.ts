// Importing libraries
import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";

//Importing private key
require('dotenv').config();

//Instantiate 3rdweb SDK
const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    // Your wallet private key
    process.env.PRIVATE_KEY as string,
    // RPC URL, we'll use Polygon Mumbai
    ethers.getDefaultProvider("https://rpc-mumbai.maticvigil.com")
  )
);

// Instantiate Token module
const token = sdk.getCurrencyModule("0xFf5f08cA7c5b0287A349517fa4B4243BB13229b9");

// Set the amount of currency you want to mint
// (Actual amount, number of decimals)
const amount = ethers.utils.parseUnits("1000", 18);

// Minting the currency, 1000 Test coin
const mintCurrency = async () => {
  try {
    await token.mint(amount);
    console.log("Minted 1000 Test coin");
  } catch (err) {
    console.log(err);
  }
};

// Running the entire thing
mintCurrency();