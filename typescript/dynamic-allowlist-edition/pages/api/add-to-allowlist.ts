import type { NextApiRequest, NextApiResponse } from "next";
import { table } from "../../utils/Airtable";

const addToAllowlist = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = JSON.parse(req.body);

  const record = await table
    .select({
      fields: ["Addresses", "minted"],
      filterByFormula: `NOT({Addresses} != '${address}')`,
    })
    .all();

  if (record.length > 0) {
    res.status(400).json({
      success: false,
      error: "User is already in allowlist",
    });
  }

  if (record.length === 0) {
    try {
      await table.create([
        {
          fields: {
            Addresses: address,
          },
        },
      ]);
      res.status(200).json({
        success: true,
        message: "User added to allowlist",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err,
      });
    }
  }
};

export default addToAllowlist;
