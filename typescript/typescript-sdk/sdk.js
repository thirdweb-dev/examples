"use strict";
exports.__esModule = true;
// Importing libraries
var sdk_1 = require("@thirdweb-dev/sdk");
var ethers_1 = require("ethers");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
// Instantiate thirdweb SDK
var sdk = new sdk_1.ThirdwebSDK(new ethers_1.ethers.Wallet(
// Your wallet private key
process.env.PRIVATE_KEY, 
// RPC URL, we'll use Polygon Mumbai
ethers_1.ethers.getDefaultProvider("https://matic-mumbai.chainstacklabs.com")));
