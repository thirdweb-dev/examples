import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useMetamask,
  useNFTs,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const { contract } = useContract(
    "0x05B8aab3fd77580C29c6510d8C54D9E6be4262d2"
  );

  const { data: nfts, isLoading: loading } = useNFTs(contract?.nft, {
    start: 0,
    count: 10,
  });

  const truncateAddress = (address: string) => {
    return (
      address.substring(0, 6) + "..." + address.substring(address.length - 4)
    );
  };

  if (loading) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {!address && (
        <button onClick={connectWithMetamask}>Connect Wallet</button>
      )}

      {nfts && nfts?.length > 0 && (
        <div className={styles.cards}>
          {nfts
            .filter(
              (nft) =>
                nft.owner !== "0x0000000000000000000000000000000000000000"
            )
            .map((nft) => (
              <div key={nft.metadata.id.toString()} className={styles.card}>
                <h1>{nft.metadata.name}</h1>
                <ThirdwebNftMedia
                  metadata={nft.metadata}
                  className={styles.image}
                />
                <p>
                  owned by{" "}
                  {address && nft.owner === address
                    ? "you"
                    : truncateAddress(nft.owner)}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Home;
