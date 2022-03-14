import { NextApiResponse, NextApiRequest } from "next";
import database from "../../db/instance";

export default async function challenge(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);
  console.log(body);
  console.log(
    "In the server, generating challenge for address " + body.address
  );

  const address = body.address;

  const challenge = await database.generateChallenge(address);
  return res.status(200).json({ challenge });
}
