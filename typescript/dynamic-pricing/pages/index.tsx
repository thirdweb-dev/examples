import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';
import type { NextPage } from 'next';
import styles from '../styles/styles.module.css';
import Image from 'next/image';
import tw from '../public/tw.png';
import { useNFTDrop } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';

const Home: NextPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const nftDrop = useNFTDrop('0x82747Bd4e435C9D5cF2342c8361B19910259C264');
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [price, setPrice] = useState('0');

  useEffect(() => {
    if (!nftDrop) return;

    const getPrice = async () => {
      try {
        const claimCondition = await nftDrop.claimConditions.getActive();
        const price = claimCondition.currencyMetadata.displayValue;
        setPrice(price);
      } catch (error) {
        console.log(error);
      }
    };
    getPrice();
  }, [nftDrop, hasClaimedNFT]);

  const mintNft = async () => {
    try {
      setIsClaiming(true);
      await nftDrop?.claim(1);
      setHasClaimedNFT(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsClaiming(false);
    }

    try {
      await fetch('/api/update-pricing');
    } catch (error) {
      console.log(error);
    }
  };

  if (!address) {
    return (
      <div className={styles.mintnft}>
        <button className={styles.mintNftButton} onClick={connectWithMetamask}>
          Connect with Metamask
        </button>
      </div>
    );
  }

  return (
    <div className={styles.body}>
      <div>
        <div className={styles.header}>
          <p>Welcome: {address}</p>
          <button className={styles.mintNftButton} onClick={disconnectWallet}>
            Disconnect Wallet
          </button>
        </div>
        {/* big image and title */}
        <div className={styles.hero}>
          <div className={styles.imageContainer}>
          <Image
            src={tw}
            alt="Image of the NFT"
            />
            </div>
          <div className={styles.heroRight}>
            <p className={styles.heroText}>Minting has started!</p>
              {/* mint NFT button */}
            <div className={styles.nfts}>
          <div>
            {price !== "0" && <p>Price is {price} ETH</p>}
          </div>

          <button className={styles.mintNftButton} onClick={mintNft} disabled={isClaiming}>
            Click here to mint NFT
          </button>
        </div>
          </div>
        </div>



      </div>
    </div>
  );
};

export default Home;
