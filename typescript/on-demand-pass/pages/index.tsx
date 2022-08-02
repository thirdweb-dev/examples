import {
  useAddress,
  useMetamask,
  useNFTCollection,
  useSignatureDrop,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const collection = useNFTCollection(
    "0xeED8165505d78D2CA9f2b4fA6Aff179CeBd4dCA4"
  );

  const mint = async () => {
    const signedPayloadReq = await fetch("/api/generate-mint-sig", {
      method: "POST",
      body: JSON.stringify({ address }),
    });

    const signedPayload = await signedPayloadReq.json();

    try {
      const nft = await collection?.signature.mint(signedPayload.signedPayload);
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
