// Importing libraries
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

// Your wallet private key (note: using private key is not recommended)
const PRIVATE_KEY = process.env.PRIVATE_KEY as string;

if (!PRIVATE_KEY) {
  throw "no private key found! did you forget to set it in .env file?";
}

// Instantiate thirdweb SDK
const sdk = ThirdwebSDK.fromPrivateKey(PRIVATE_KEY, "mumbai")
