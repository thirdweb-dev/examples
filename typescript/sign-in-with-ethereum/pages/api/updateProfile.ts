import { NextApiRequest, NextApiResponse } from "next";

import { verify } from "jsonwebtoken";

import database from "../../db/instance";

export default async function updateProfile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Token is formatted as `Bearer <token>`
  const jwt = (req["headers"] as any)["authorization"].split(" ")[1];

  const decoded = verify(jwt, "PRATHAM") as any;
  const address = decoded.address;

  const body = JSON.parse(req.body);
  const username = body.username;

  console.log(`Updating username for address ${address} to ${username}`);
  await database.setUser(address, username);
  return res.status(200).send("");
}
