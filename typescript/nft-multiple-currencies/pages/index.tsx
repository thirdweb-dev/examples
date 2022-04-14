import { useAddress, useEdition, useMetamask } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { nft } from "../nft";

const Home: NextPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const editionContract = useEdition(
    "0x09fd447A2E065c9CA83934088D64372dDE15EE87"
  );
  const [tokenName, setTokenName] = useState("MATIC");

  const mintWithSignature = async (tokenId: string) => {
    const signedPayloadReq = await fetch(`/api/generate-mint-sig`, {
      method: "POST",
      body: JSON.stringify({
        tokenName,
        tokenId,
        address,
      }),
    });

    const signedPayload = (await signedPayloadReq.json()).signedPayload;

    const nft = await editionContract?.signature.mint(signedPayload);

    console.log(nft);

    return nft;
  };

  return (
    <div>
      {address ? (
        <>
          <div>
            <img src={nft.image} alt={nft.name} width="200px" height="100%" />
            <div>
              <p>Name: {nft.name}</p>
              <p>Description: {nft.description}</p>
              <select onChange={(e) => setTokenName(e.target.value)}>
                {nft.tokens.map((token) => (
                  <option key={token.name} value={token.name}>
                    {token.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  mintWithSignature(nft.id);
                }}
              >
                Mint
              </button>
            </div>
          </div>
        </>
      ) : (
        <button onClick={connectWithMetamask}>Connect with Metamask</button>
      )}
    </div>
  );
};

export default Home;
