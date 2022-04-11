import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { ethers } from 'ethers';
import { NextApiRequest, NextApiResponse } from 'next';

// This depend on your HTTP Server setup. In this example, we're using next.js
// api handlers.
export default async function updatePricing(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // the RPC URL to the blockchain that the nftDrop contract is deployed on.
  // "rinkeby" = rinkeby testnet,
  // "https://rpc-mumbai.maticvigil.com" = mumbai testnet.
  const rpcUrl = "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
  const privateKey = process.env.PRIVATE_KEY as string;
  // setup a wallet using private key for the SDK.
  // the wallet must have MINTER role to mint the nftDrop.
  // you can assign MINTER role to the wallet through the nftDrop collection dashboard.
  const wallet = new ethers.Wallet(
    privateKey,
    ethers.getDefaultProvider(rpcUrl),
  );

  // initialize the SDK and get the nftDrop contract
  // get the contract address (0x...) from your dashboard!
  const nftDrop = new ThirdwebSDK(wallet).getNFTDrop(
    '0x82747Bd4e435C9D5cF2342c8361B19910259C264',
  );

  try {
    await nftDrop.claimConditions.update(
      1, // index of our claim condition
      { startTime: new Date() },
    );
    res.status(200).json({ message: 'Claim conditions updated successfully!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating claim conditions!' });
  }
}
