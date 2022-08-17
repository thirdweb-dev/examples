import type { NextApiRequest, NextApiResponse } from "next";
import { table } from "../../utils/Airtable";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, quantity } = JSON.parse(req.body);
  if (req.headers["sec-fetch-site"] !== "same-origin") {
    return res.status(403).json({
      error: "Forbidden",
      message: "This endpoint can only be called from the same origin.",
    });
  }

  const record = await table
    .select({
      fields: ["address", "quantityClaimed"],
      filterByFormula: `NOT({address} != '${address}')`,
    })
    .all();

  const quantityClaimed = record[0]?.fields?.quantityClaimed as number;

  if (record.length > 0) {
    record[0].updateFields({
      quantityClaimed: quantityClaimed - parseInt(quantity),
    });

    return res.status(200).json({
      message: "success",
      data: record[0].fields,
    });
  }

  return res.status(404).json({
    message: "not found",
  });
};

export default handler;
