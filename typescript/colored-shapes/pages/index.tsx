import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();

  return (
    <div className={styles.container}>
      {address ? (
        <>
          <iframe
            src="https://gateway.ipfscdn.io/ipfs/QmVn8f6KP5y18QTfM7zwJXt1ybi8zefisyYqo7SRGq3n5j/drop.html?contract=0x22c7Ef5e6D6d5949fF82290a84C36e74FF6d9869&chainId=80001"
            width="600px"
            height="600px"
            style={{ maxWidth: "100%" }}
            frameBorder="0"
          ></iframe>

          <Link href="/color" passHref>
            <a className={styles.btn}>Get color</a>
          </Link>
        </>
      ) : (
        <button onClick={connectWithMetamask}>Connect with Metamask</button>
      )}
    </div>
  );
};

export default Home;
