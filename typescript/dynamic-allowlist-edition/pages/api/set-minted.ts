import type { NextApiRequest, NextApiResponse } from "next";
import { table } from "../../utils/Airtable";

const generateMintSignature = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { address } = JSON.parse(req.body);

  const record = await table
    .select({
      fields: ["Addresses", "minted"],
      filterByFormula: `NOT({Addresses} != '${address}')`,
    })
    .all();

  try {
    record[0].updateFields({
      minted: "true",
    });
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

export default generateMintSignature;
