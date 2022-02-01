import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Connect } from '../components/connect';
import { Pack } from '../components/pack';
import { useWeb3 } from '@3rdweb/hooks';

const Home: NextPage = () => {
  const { address } = useWeb3();
  return (
    <div className={styles.container}>
      <Head>
        <title>thirdweb packs</title>
        <meta name="description" content="Sell and open packs of NFTs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Connect />

      <main className={styles.main}>
        {address ? <Pack /> : <p>Please connect your Wallet first.</p>}
      </main>
    </div>
  );
};

export default Home;
