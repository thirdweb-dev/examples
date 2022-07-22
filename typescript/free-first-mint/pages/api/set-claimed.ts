import type { NextApiRequest, NextApiResponse } from "next";
import { table } from "../../utils/Airtable";
import sdk from "../../utils/thirdweb";

const generateMintSignature = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { address } = JSON.parse(req.body);

  const drop = sdk.getSignatureDrop(
    "0x6d148a12f7c0ae693609F5a26E085646f8F73A53"
  );
  const balance = await drop.balanceOf(address);
  console.log(balance.toNumber());

  if (balance.toNumber() > 0) {
    const record = await table
      .select({
        fields: ["address", "hasClaimed"],
        filterByFormula: `NOT({address} != '${address}')`,
      })
      .all();

    try {
      if (record.length > 0) {
        record[0].updateFields({
          hasClaimed: "true",
        });
      } else {
        await table.create({
          address: address,
          hasClaimed: "true",
        });
      }

      return res.status(200).json({
        success: true,
      });
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    }
  }
  res.status(400).json({
    error: "The user hasn't claimed NFT yet.",
  });
};

export default generateMintSignature;
