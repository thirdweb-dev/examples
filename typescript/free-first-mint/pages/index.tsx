import { useAddress, useMetamask, useSignatureDrop } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const signatureDrop = useSignatureDrop(
    "0x6d148a12f7c0ae693609F5a26E085646f8F73A53"
  );
  const [quantity, setQuantity] = useState<string>("1");

  const mint = async () => {
    const signedPayloadReq = await fetch("/api/generate-mint-sig", {
      method: "POST",
      body: JSON.stringify({ address, quantity }),
    });
    const signedPayload = await signedPayloadReq.json();

    try {
      const nft = await signatureDrop?.signature.mint(
        signedPayload.signedPayload
      );
      return nft;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return (
    <div>
      {address ? (
        <>
          <button onClick={mint}>Mint</button>
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            type="number"
          />
        </>
      ) : (
        <button onClick={connectWithMetamask}>Connect with Metamask</button>
      )}
    </div>
  );
};
export default Home;
