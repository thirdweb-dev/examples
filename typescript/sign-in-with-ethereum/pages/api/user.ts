import { NextApiRequest, NextApiResponse } from "next";

import { verify } from "jsonwebtoken";

import database from "../../db/instance";

/**
 * A simulated "backend" that we're using as an example
 * of a centralized application, like Rarible.
 */
export default async function user(
  req: NextApiRequest,
  response: NextApiResponse
) {
  const jwt = (req["headers"] as any)["authorization"].split(" ")[1];

  const decoded = verify(jwt, "PRATHAM") as any;
  const address = decoded.address;

  const username = await database.getUser(address);

  return response.status(200).json({ username });
}
