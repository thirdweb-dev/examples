import { ConnectWallet, useAddress, useContract } from "@thirdweb-dev/react";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const address = useAddress();
  const { contract } = useContract(
    "0xcDFA0Db479d35e1D1C76bf2D65166e32Ce42F048",
    "edition-drop"
  );
  const [loading, setLoading] = useState(false);

  const tokenId = 0;
  const quantity = 1;

  const claimNFT = async () => {
    if (address && contract) {
      setLoading(true);
      try {
        await contract.erc1155?.claimTo(address, tokenId, quantity);
        console.log("🎉 NFT claimed successfully!");
      } catch (err) {
        console.log("💩 Error claiming NFT: ", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.container}>
      {address ? (
        <button onClick={claimNFT}>
          {loading ? "Claiming..." : "Claim NFT"}
        </button>
      ) : (
        <ConnectWallet />
      )}
    </div>
  );
}
