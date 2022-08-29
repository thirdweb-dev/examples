import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Color.module.css";

const Color: NextPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();

  return (
    <div className={styles.container}>
      {address ? (
        <>
          <div className={styles.NFTs}>
            <iframe
              src="https://gateway.ipfscdn.io/ipfs/Qma17oTrNVQqPTg8v3E5UvHYFbXjbgeqHCocDZtPyUopLX/bundledrop.html?contract=0xBAb735464259593eD055821b0b17a079dcBd1f5f&chainId=80001&tokenId=0"
              width="400px"
              height="400px"
              style={{ maxWidth: "100%" }}
              frameBorder="0"
            ></iframe>

            <iframe
              src="https://gateway.ipfscdn.io/ipfs/Qma17oTrNVQqPTg8v3E5UvHYFbXjbgeqHCocDZtPyUopLX/bundledrop.html?contract=0xBAb735464259593eD055821b0b17a079dcBd1f5f&chainId=80001&tokenId=1"
              width="400px"
              height="400px"
              style={{ maxWidth: "100%" }}
              frameBorder="0"
            ></iframe>

            <iframe
              src="https://gateway.ipfscdn.io/ipfs/Qma17oTrNVQqPTg8v3E5UvHYFbXjbgeqHCocDZtPyUopLX/bundledrop.html?contract=0xBAb735464259593eD055821b0b17a079dcBd1f5f&chainId=80001&tokenId=2"
              width="400px"
              height="400px"
              style={{ maxWidth: "100%" }}
              frameBorder="0"
            ></iframe>
          </div>

          <Link href="/evolve" passHref>
            <a className={styles.btn}>Evolve your NFT</a>
          </Link>
        </>
      ) : (
        <button onClick={connectWithMetamask}>Connect with Metamask</button>
      )}
    </div>
  );
};

export default Color;
