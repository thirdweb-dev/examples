import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
import { nft } from "../../nft";

const generateMintSignature = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { tokenId, address, tokenName } = JSON.parse(req.body);

  const sdk = new ThirdwebSDK(
    new ethers.Wallet(
      process.env.PRIVATE_KEY as string,
      ethers.getDefaultProvider(process.env.ALCHEMY_API_URL)
    )
  );

  const edition = sdk.getEdition("0x4ebCf39BCeEA3C9790605BF292B4a2b8811C93eD");

  const getToken = (tokenName: string) => {
    return nft.tokens.find((t) => t.name === tokenName);
  };

  const token = getToken(tokenName) ? getToken(tokenName) : getToken("MATIC");

  try {
    const signedPayload = await edition.signature.generate({
      tokenId: tokenId,
      quantity: "1",
      to: address,
      currencyAddress: token?.address,
      price: token?.price,
    });

    res.status(200).json({
      signedPayload: signedPayload,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

export default generateMintSignature;
