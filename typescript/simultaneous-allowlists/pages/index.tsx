import { useAddress, useMetamask, useSignatureDrop } from "@thirdweb-dev/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const drop = useSignatureDrop("0x74B3c525AEC4c7b1Fd9e173eB865785db638ea7F");

  const mint = async () => {
    const signedPayloadReq = await fetch("/api/generate-mint-sig", {
      method: "POST",
      body: JSON.stringify({ address }),
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
        <button onClick={mint}>Mint</button>
      ) : (
        <button onClick={connectWithMetamask}>Connect with Metamask</button>
      )}
    </div>
  );
};

export default Home;
