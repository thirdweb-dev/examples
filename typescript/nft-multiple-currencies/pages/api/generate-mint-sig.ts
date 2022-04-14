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
      ethers.getDefaultProvider(
        "https://polygon-mumbai.g.alchemy.com/v2/TcwiP2BV-1oRIrjlG5aPceb43auHnGHC"
      )
    )
  );

  const editionContract = sdk.getEdition(
    "0x09fd447A2E065c9CA83934088D64372dDE15EE87"
  );

  const token = nft.tokens.find((t) => t.name === tokenName)
    ? nft.tokens.find((t) => t.name === tokenName)
    : nft.tokens.find((t) => t.name === "MATIC");

  try {
    const signedPayload = await editionContract.signature.generate({
      tokenId: tokenId,
      quantity: "1",
      metadata: "",
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
