import type { NextApiRequest, NextApiResponse } from 'next';
import { ThirdwebSDK } from "@3rdweb/sdk";
import { BigNumber, ethers } from 'ethers';
import { readFileSync } from 'fs';

require('dotenv').config();

interface RequestData {
  address: string;
}

interface ResponseData {
  packId: string;
  packAddress: string;
}

const PACK_MODULE_ADDRESS = process.env.PACK_MODULE_ADDRESS as string;

const WALLET = new ethers.Wallet(
  process.env.PRIVATE_KEY as string,
  ethers.getDefaultProvider('https://rpc-mumbai.maticvigil.com')
);
const SDK = new ThirdwebSDK(WALLET);
const MODULE = SDK.getPackModule(PACK_MODULE_ADDRESS);

export const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method !== 'POST') {
    res.status(405).end();
  }

  if (!req.body) {
    res.status(400).end();
  }

  const requestData = req.body as RequestData;

  // Data to create the pack
  const pack = {
    // The address of the contract that holds the rewards you want to include
    assetContract: process.env.ASSET_CONTRACT_ADDRESS as string,
    // The metadata of the pack
    metadata: {
      name: 'Cool Pack',
      description: 'This is a cool pack',
      // This can be an image url or image file
      image: readFileSync('public/thirdweb_logo.png'),
    },
    // The NFTs you want to include in the pack
    assets: [
      {
        tokenId: 2, // The token ID of the asset you want to add
        amount: 1, // The amount of the asset you want to add
      }, {
        tokenId: 3,
        amount: 1,
      }
    ],
  };

  try {
    const createResult = await MODULE.create(pack);
    const { id } = createResult;

    await MODULE.transfer(requestData.address, id, BigNumber.from(1));

    res.status(200).json({ 
      packId: id,
      packAddress: PACK_MODULE_ADDRESS
    });

  } catch (error: any) {
    res.status(500).end();
  }
};

export default handler;
