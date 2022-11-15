import { ConnectWallet, useAddress, useContract } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const address = useAddress();
  const { contract } = useContract(
    "0xcDFA0Db479d35e1D1C76bf2D65166e32Ce42F048"
  );

  const tokenId = 0;
  const quantity = 1;

  const claimNFT = async () => {
    try {
      await contract?.claimTo(address, tokenId, quantity);
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
        <ConnectWallet />
      )}
    </div>
  );
}
