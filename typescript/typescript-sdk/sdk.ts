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