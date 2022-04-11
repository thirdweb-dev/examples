import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';
import type { NextPage } from 'next';
import styles from '../styles/mystyles.module.css';
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
  const [claimed, setClaimed] = useState(0);
  const [price, setPrice] = useState('0');

  useEffect(() => {
    if (!nftDrop) return;

    const checkSupply = async () => {
      try {
        const supply = await nftDrop?.totalClaimedSupply();
        // todo setClaimed()
        console.log(supply);
      } catch (error) {
        console.log(error);
      }
    };
    checkSupply();
  }, [nftDrop]);

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
  }, [nftDrop]);

  // define the same max claim-limit as your first maxclaimcondition
  const claimLimit = 48;

  const mintNft = async () => {
/*     try {
      await nftDrop?.claim(1);
    } catch (error) {
      console.log(error);
      return;
    } */

    const totalClaimedSupply = (
      await nftDrop?.totalClaimedSupply()
    )?.toNumber();
    if (totalClaimedSupply === claimLimit) {
      try {
        await fetch('/api/update-pricing');
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!address) {
    return (
      <div className={styles.mintnft}>
        <button className={styles.mintnftbutton} onClick={connectWithMetamask}>
          Connect with Metamask
        </button>
      </div>
    );
  }

  return (
    <div className={styles.body}>
      <div>
        <div className={styles.myheader}>
          <p>Welcome: {address}</p>
          <button className={styles.mintnftbutton} onClick={disconnectWallet}>
            Disconnect Wallet
          </button>
        </div>
        {/* big image and title */}
        <div className={styles.hero}>
          <Image
            className={styles.hero_image}
            src={tw}
            alt="Picture of the author"
            width="700px"
            height="500px"
          />
          <div>
            <p className={styles.hero_text}>Minting has started!</p>
          </div>
        </div>

        {/* mint NFT button */}
        <div className={styles.nfts}>
          <div>
            <p>Price is {price} ETH</p>
          </div>

          <button className={styles.mintnftbutton} onClick={mintNft}>
            Click here to mint NFT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
