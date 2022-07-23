import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = JSON.parse(req.body);

  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.PRIVATE_KEY as string,
    "mumbai"
  );

  const collection = sdk.getNFTCollection(
    "0xeED8165505d78D2CA9f2b4fA6Aff179CeBd4dCA4"
  );

  try {
    const signedPayload = await collection.signature.generate({
      to: address,
      metadata: {
        name: "Test title",
        description: "Test description",
        image:
          "https://images.unsplash.com/photo-1658309833607-4de9956d0bbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
        properties: {
          type: "test",
        },
      },
      price: "1",
    });

    return res.status(200).json({
      signedPayload: signedPayload,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
    });
  }
};

export default handler;
