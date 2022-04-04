// Importing libraries
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

//Importing private key
require("dotenv").config();

// Your wallet private key (note: using private key is not recommended)
const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
// your token contract address
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS as string;

if (!PRIVATE_KEY) {
  throw "no private key found! did you forget to set it in .env file?";
}
if (!CONTRACT_ADDRESS) {
  throw "no contract address found! did you forget to set it in .env file?";
}

//Instantiate 3rdweb SDK
const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    PRIVATE_KEY,
    // RPC URL, we'll use Polygon Mumbai
    ethers.getDefaultProvider("https://rpc-mumbai.maticvigil.com")
  )
);

// Instantiate Token contract with your token contract address
const token = sdk.getToken(CONTRACT_ADDRESS);

// Minting the currency, 1000 Test coin
const mintCurrency = async () => {
  try {
    await token.mint(1000);
    console.log("Minted 1000 Test coin");
  } catch (err) {
    console.log(err);
  }
};

// Running the entire thing
mintCurrency();
