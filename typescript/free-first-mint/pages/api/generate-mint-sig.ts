import type { NextApiRequest, NextApiResponse } from "next";
import { table } from "../../utils/Airtable";
import sdk from "../../utils/thirdweb";

const generateMintSignature = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { address, quantity } = JSON.parse(req.body);
  const pricePerNft = 2;

  const drop = sdk.getSignatureDrop(
    "0x6d148a12f7c0ae693609F5a26E085646f8F73A53"
  );

  const record = await table
    .select({
      fields: ["address", "hasClaimed"],
      filterByFormula: `NOT({address} != '${address}')`,
    })
    .all();

  const determinePrice = (): number => {
    if (record[0]?.fields?.hasClaimed) {
      return pricePerNft;
    }
    return ((quantity - 1) * pricePerNft) / quantity;
  };

  try {
    const signedPayload = await drop.signature.generate({
      to: address,
      price: determinePrice(),
      quantity,
    });

    return res.status(200).json({
      signedPayload,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

export default generateMintSignature;
