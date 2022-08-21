import {
  useAddress,
  useContract,
  useMetamask,
  useNFTs,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();

  const { contract } = useContract(
    "0x84E490af996A4ff59978253BAA0A72F559862D54"
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
      {address ? (
        <>
          {nfts && nfts?.length > 0 && (
            <div className={styles.cards}>
              {nfts
                .filter(
                  (nft) =>
                    nft.owner !== "0x0000000000000000000000000000000000000000"
                )
                .map((nft) => (
                  <div key={nft.metadata.id.toString()} className={styles.card}>
                    {nft.metadata.id.toString()}
                    <h1>{nft.metadata.name}</h1>
                    {nft.metadata?.image && (
                      <div className={styles.image}>
                        <Image
                          src={nft.metadata?.image}
                          layout="fill"
                          objectFit="contain"
                          alt={nft.metadata.name}
                        />
                      </div>
                    )}
                    {address === nft.owner ? (
                      <p>Owned by you</p>
                    ) : (
                      <p>Owner: {truncateAddress(nft.owner)}</p>
                    )}
                  </div>
                ))}
            </div>
          )}
        </>
      ) : (
        <button onClick={connectWithMetamask}>Connect with Metamask</button>
      )}
    </div>
  );
};

export default Home;
