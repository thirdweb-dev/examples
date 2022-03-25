import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

// This depend on your HTTP Server setup. In this example, we're using next.js
// api handlers.
export default async function mint(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> {
  res.json({
    result: await fetch(
      `https://deep-index.moralis.io/api/v2/${req.query.Address}/nft?chain=mumbai&format=decimal`,
      {
        method: "GET",
        headers: {
          "X-API-Key":
            "gWhXCyk4w6DeyPqJizoiM7c0I4NaQZNYpVoCw0LRjJrUekCb7Ac55fL6ztxoIjJJ",
        },
      }
    )
      .then(async (resp) => {
        console.log(resp);
        return await resp.json();
      })
      .then((resp) => resp.result),
  });
}
