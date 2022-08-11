import type { NextApiRequest, NextApiResponse } from "next";
import { table } from "../../utils/Airtable";
import sdk from "../../utils/thirdweb";

const generateMintSignature = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { address, quantity } = JSON.parse(req.body);
  const quantityToMint = parseInt(quantity) as number;
  const pricePerNft = 2;
  const freeNFTs = 8;

  const drop = sdk.getSignatureDrop(
    "0x6d148a12f7c0ae693609F5a26E085646f8F73A53"
  );

  const record = await table
    .select({
      fields: ["address", "quantityClaimed"],
      filterByFormula: `NOT({address} != '${address}')`,
    })
    .all();

  const quantityClaimed = (record[0]?.fields?.quantityClaimed as number) || 0;

  const determinePrice = (): number => {
    if (quantityClaimed >= freeNFTs) {
      return pricePerNft;
    }
    return ((quantityToMint - freeNFTs) * pricePerNft) / quantityToMint;
  };

  try {
    const signedPayload = await drop.signature.generate({
      to: address,
      price: determinePrice(),
      quantity: quantityToMint,
    });

    if (record.length > 0) {
      record[0].updateFields({
        quantityClaimed: quantityClaimed + quantityToMint,
      });
    } else {
      await table.create({
        address,
        quantityClaimed: quantityToMint,
      });
    }

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
