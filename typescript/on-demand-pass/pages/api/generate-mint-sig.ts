import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { readFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = JSON.parse(req.body);

  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.PRIVATE_KEY as string,
    "mumbai"
  );

  const collection = sdk.getNFTCollection(
    "0xeED8165505d78D2CA9f2b4fA6Aff179CeBd4dCA4"
  );

  const metadata = {
    name: "Thirdweb",
    description: "Build web3 apps, easily.",
    image: readFileSync(path.join(process.cwd(), "public", "thirdweb.svg")),
    properties: {
      web: "3",
    },
  };

  try {
    const signedPayload = await collection.signature.generate({
      to: address,
      metadata,
      price: "1",
    });

    return res.status(200).json({
      signedPayload,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
    });
  }
};

export default handler;
