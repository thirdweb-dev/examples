import { useAddress, useMetamask, useSignatureDrop } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const [quantity, setQuantity] = useState<string>("1");

  const drop = useSignatureDrop("0x36020789F0530bF6f1Da1Aef74c80381ABD17c4c");

  const mint = async () => {
    if (!quantity || parseInt(quantity) < 1) {
      return alert("Please enter a quantity");
    }

    if (parseInt(quantity) > 5) {
      return alert("Please enter a quantity less than 5");
    }

    const signedPayloadReq = await fetch("/api/generate-mint-sig", {
      method: "POST",
      body: JSON.stringify({ address, quantity }),
    });
    const signedPayload = await signedPayloadReq.json();

    try {
      const nft = await drop?.signature.mint(signedPayload.signedPayload);
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
          <input
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
          />

          <button onClick={mint}>Mint</button>
        </>
      ) : (
        <button onClick={connectWithMetamask}>Connect with Metamask</button>
      )}
    </div>
  );
};

export default Home;
