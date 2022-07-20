import {
  useAddress,
  useDisconnect,
  useMetamask,
  useSignatureDrop,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const signatureDrop = useSignatureDrop(
    "0x6d148a12f7c0ae693609F5a26E085646f8F73A53"
  );

  const mint = async () => {
    const signedPayloadReq = await fetch("/api/generate-mint-sig", {
      method: "POST",
      body: JSON.stringify({ address }),
    });

    const signedPayload = await signedPayloadReq.json();

    try {
      const nft = await signatureDrop?.signature.mint(
        signedPayload.signedPayload
      );
      if (nft) {
        await fetch("/api/set-claimed", {
          method: "POST",
          body: JSON.stringify({ address }),
        });
      }
      return nft;
    } catch (err) {
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
