import { Web3Button } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { tokenId, quantity, contractAddress } from "../const/yourDetails";

export default function Home() {

  return (
    <div className={styles.container}>
      <Web3Button
        contractAddress={contractAddress}
        action={(contract) => contract.erc1155.claim(tokenId, quantity)}
        onSuccess={() => alert("Claimed!")}
        onError={() => alert("Something went wrong")}
      >
        Claim
      </Web3Button>
    </div>
  );
}
