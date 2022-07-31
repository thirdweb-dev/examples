import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";

const generateMintSignature = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { shape, color } = JSON.parse(req.body);

  const sdk = new ThirdwebSDK(
    new ethers.Wallet(
      process.env.PRIVATE_KEY as string,
      ethers.getDefaultProvider(process.env.ALCHEMY_API_URL)
    )
  );

  const shapeDrop = sdk.getNFTDrop(
    "0x22c7Ef5e6D6d5949fF82290a84C36e74FF6d9869"
  );
  const colorDrop = sdk.getEditionDrop(
    "0xBAb735464259593eD055821b0b17a079dcBd1f5f"
  );

  const nftCollection = sdk.getNFTCollection(
    "0x8fC2d4D86eA1836c69CABA231670D93dc3942612"
  );

  try {
    const shapeNFT = await shapeDrop.get(shape);
    const colorNFT = await colorDrop.get(color);

    try {
      const svgContentShapeReq = await fetch(shapeNFT.metadata.image!, {
        method: "GET",
        headers: {
          "Content-Type": "image/svg+xml",
        },
      });
      const svgContentShape = await svgContentShapeReq.text();

      const newSvg = svgContentShape.replace(
        /fill="none"/g,
        // @ts-ignore
        `fill="#${colorNFT.metadata?.attributes[0]?.value}"`
      );

      const signaturePayload = await nftCollection.signature.generate({
        metadata: {
          image: newSvg,
          name: colorNFT.metadata.name + " " + shapeNFT.metadata.name,
          description: "",
          attributes: [],
        },
        to: shapeNFT.owner,
        price: 0,
      });

      return res.json({
        signedPayload: signaturePayload,
      });
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default generateMintSignature;
