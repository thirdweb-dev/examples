// Importing libraries
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    // Your wallet private key
    process.env.PRIVATE_KEY as string,
    // RPC URL
    ethers.getDefaultProvider('https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161')
  )
);

// Set variable for the edition drop module contract address which can be found after creating a edition drop module in the dashboard
const editionDropAddress = '<CONTRACT_ADDRESS>';

// Initialize the edition drop module with the contract address
const editionDrop = sdk.getEditionDrop(editionDropAddress)


export default editionDrop;