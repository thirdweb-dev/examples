import {
  useAddress,
  useEdition,
  useMetamask,
  useNetwork,
} from "@thirdweb-dev/react";
import { ChainId, EditionMetadata } from "@thirdweb-dev/sdk";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const edition = useEdition("0x62C84CC051544c43d05a5Ff0E8Da596fBdB15032");
  const [nftData, setNftData] = useState<EditionMetadata["metadata"] | null>(
    null
  );
  const [addWalletLoading, setAddWalletLoading] = useState(false);
  const [mintLoading, setMintLoading] = useState(false);
  const network = useNetwork();

  useEffect(() => {
    edition?.get("0").then((nft) => {
      setNftData(nft.metadata);
    });
  }, [edition]);

  const mintWithSignature = async () => {
    setMintLoading(true);
    const signedPayloadReq = await fetch(`/api/generate-mint-sig`, {
      method: "POST",
      body: JSON.stringify({ address }),
    });

    const signedPayload = await signedPayloadReq.json();

    if (signedPayload.error) {
      alert(signedPayload.error);
      return;
    }

    try {
      const nft = await edition?.signature.mint(signedPayload.signedPayload);
      if (nft) {
        await fetch(`/api/set-minted`, {
          method: "POST",
          body: JSON.stringify({ address }),
        });
      }
      return nft;
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      setMintLoading(false);
    }
  };

  const addWallet = async () => {
    setAddWalletLoading(true);
    const payload = await fetch(`/api/add-to-allowlist`, {
      method: "POST",
      body: JSON.stringify({ address }),
    });

    const payloadJson = await payload.json();
    setAddWalletLoading(false);

    if (payloadJson.success) {
      alert(payloadJson.message);
    } else {
      alert(payloadJson.error);
    }
  };

  return (
    <div className={styles.container}>
      {address ? (
        <div className={styles.NFT}>
          {nftData?.image && (
            <Image
              src={nftData?.image}
              alt={nftData?.name}
              width="280"
              height="210"
              objectFit="contain"
            />
          )}
          <p className={styles.nftDesc}>
            <span>Name:</span> {nftData?.name}
          </p>
          <p className={styles.nftDesc}>
            <span> Description:</span> {nftData?.description}
          </p>

          <button
            className={styles.btn}
            disabled={addWalletLoading}
            onClick={addWallet}
          >
            {addWalletLoading ? "loading..." : "Add wallet to allowlist"}
          </button>

          <button
            className={styles.btn}
            disabled={
              mintLoading || network[0]?.data?.chain?.id !== ChainId.Mumbai
            }
            onClick={() => mintWithSignature()}
          >
            {network[0]?.data?.chain?.id === ChainId.Mumbai
              ? mintLoading
                ? "loading..."
                : "Mint"
              : "Switch to Mumbai"}
          </button>
        </div>
      ) : (
        <button onClick={connectWithMetamask}>Connect with Metamask</button>
      )}
    </div>
  );
};

export default Home;
