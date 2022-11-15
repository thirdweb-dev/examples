import { Web3Button } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const tokenId = 0;
  const quantity = 1;

  return (
    <div className={styles.container}>
      <Web3Button
        contractAddress="0xcDFA0Db479d35e1D1C76bf2D65166e32Ce42F048"
        action={(contract) => contract.erc1155.claim(tokenId, quantity)}
        onSuccess={() => alert("Claimed!")}
        onError={() => alert("Something went wrong")}
      >
        Claim
      </Web3Button>
    </div>
  );
}
