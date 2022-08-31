import type { NextApiRequest, NextApiResponse } from "next";
import { table } from "../../utils/Airtable";
import { sdk } from "../../utils/thirdweb";

const nftsForFree = 100;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, quantity } = JSON.parse(req.body);
  let quantityToMint = parseInt(quantity);

  if (!quantityToMint) {
    return res.status(400).json({ error: "Missing quantity" });
  }
  if (quantityToMint > 5) {
    return res.status(400).json({ error: "Quantity too high" });
  }

  try {
    const records = await table
      .select({
        fields: ["Quantity"],
      })
      .all();

    const amountMinted = records[0].get("Quantity") as number;

    if (
      amountMinted + quantityToMint > nftsForFree &&
      amountMinted < nftsForFree
    ) {
      quantityToMint = nftsForFree - amountMinted;
    }

    const determinePrice = () => {
      if (amountMinted < nftsForFree) {
        return 0;
      }
      return 1;
    };

    const drop = sdk.getSignatureDrop(
      "0x36020789F0530bF6f1Da1Aef74c80381ABD17c4c"
    );

    const signedPayload = await drop.signature.generate({
      to: address,
      price: determinePrice(),
      quantity: quantityToMint,
    });

    records[0].updateFields({
      Quantity: amountMinted + quantityToMint,
    });

    return res.status(200).json({
      signedPayload,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default handler;
