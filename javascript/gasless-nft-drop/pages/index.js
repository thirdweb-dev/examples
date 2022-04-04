import { useMetamask, useAddress, useEditionDrop } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const editionDrop = useEditionDrop(
    "0xcDFA0Db479d35e1D1C76bf2D65166e32Ce42F048"
  );
  
  const tokenId = 0;
  const quantity = 1;

  const claimNFT = async () => {
    try {
      await editionDrop?.claimTo(address, tokenId, quantity);
      console.log("🎉 NFT claimed successfully!");
    } catch (err) {
      console.log("💩 Error claiming NFT: ", err);
    }
  };

  return (
    <div className={styles.container}>
      {address ? (
        <button onClick={claimNFT}>Claim NFT</button>
      ) : (
        <button onClick={connectWithMetamask}>Sign in with metamask</button>
      )}
    </div>
  );
}
