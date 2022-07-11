import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import { nft } from "../../nft";

const generateMintSignature = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { address, tokenName } = JSON.parse(req.body);

  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.PRIVATE_KEY as string,
    "mumbai"
  );

  const sigDrop = sdk.getSignatureDrop(
    "0x506215b8735D51c3099B073047683C73FCDF619D"
  );

  const getToken = (tokenName: string) => {
    return nft.tokens.find((t) => t.name === tokenName);
  };

  const token = getToken(tokenName) ? getToken(tokenName) : getToken("MATIC");

  try {
    const signedPayload = await sigDrop.signature.generate({
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
