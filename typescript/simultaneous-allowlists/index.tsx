import { useAddress, useMetamask, useSignatureDrop } from "@thirdweb-dev/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const drop = useSignatureDrop("0xcB31341eE7FaC6917e8e9D71441747e5FAdA466F");

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
        <>
          <button onClick={mint}>Mint</button>
        </>
      ) : (
        <button onClick={connectWithMetamask}>Connect with Metamask</button>
      )}
    </div>
  );
};

export default Home;
