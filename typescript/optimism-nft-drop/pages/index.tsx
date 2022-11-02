import {
  MediaRenderer,
  useContract,
  useContractMetadata,
  Web3Button,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { dropAddress } from "../consts/addresses";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { contract: nftDrop } = useContract(dropAddress);
  const { data: contractMetadata, isLoading } = useContractMetadata(nftDrop);
  const quality = 1;

  if (isLoading) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <MediaRenderer
        src={contractMetadata.image}
        alt={contractMetadata.name}
        style={{
          width: "200px",
        }}
      />
      <p>{contractMetadata.name}</p>
      <Web3Button
        contractAddress={dropAddress}
        action={(contract) => {
          contract.erc721.claim(quality);
        }}
        accentColor="#f213a4"
        onError={(error) => {
          console.error(error);
        }}
      >
        Claim
      </Web3Button>
    </div>
  );
};

export default Home;
