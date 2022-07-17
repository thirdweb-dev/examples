import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = JSON.parse(req.body);

  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.PRIVATE_KEY as string,
    "mumbai"
  );

  const drop = sdk.getSignatureDrop(
    "0x74B3c525AEC4c7b1Fd9e173eB865785db638ea7F"
  );

  const teamMembers = ["0x39Ab29fAfb5ad19e96CFB1E1c492083492DB89d4"];

  const allowList = ["0x6bF08768995E7430184a48e96940B83C15c1653f"];

  const determinePrice = (address: string) => {
    if (teamMembers.includes(address)) {
      return 0;
    }
    if (allowList.includes(address)) {
      return 1;
    }
    return 2;
  };

  try {
    const signedPayload = await drop.signature.generate({
      to: address,
      price: determinePrice(address),
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
