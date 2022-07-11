import { useAddress, useMetamask, useSignatureDrop } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { nft } from "../nft";

const Home: NextPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const [tokenName, setTokenName] = useState("MATIC");
  const sigDrop = useSignatureDrop(
    "0x506215b8735D51c3099B073047683C73FCDF619D"
  );

  const mintWithSignature = async (tokenId: string) => {
    const signedPayloadReq = await fetch("/api/generate-mint-sig", {
      method: "POST",
      body: JSON.stringify({ tokenName, tokenId, address }),
    });

    const signedPayload = (await signedPayloadReq.json()).signedPayload;

    try {
      const nft = await sigDrop?.signature.mint(signedPayload);
      return nft;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  return (
    <div>
      {address ? (
        <div>
          <Image
            src={nft.image}
            alt={nft.name}
            width="300px"
            height="300px"
            objectFit="contain"
          />
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
            <button onClick={() => mintWithSignature(nft.id)}>Mint</button>
          </div>
        </div>
      ) : (
        <button onClick={connectWithMetamask}>Connect with Metamask</button>
      )}
    </div>
  );
};

export default Home;
