import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';
import type { NextPage } from 'next';
import styles from '../styles/mystyles.module.css'
import Image from 'next/image';
import pok from '../public/pok.jpg'
import { useNFTDrop } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';
import { NFTMetadata } from '@thirdweb-dev/sdk';

const Home: NextPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  const nftDrop = useNFTDrop("0x82747Bd4e435C9D5cF2342c8361B19910259C264")

  const nftDropClaim = useNFTDrop("0x53D3c05fb634aCC87C569583fDB4718bD3186b24");
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  const [token, setToken] = useState<NFTMetadata[]>([]);
  const [claimed, setClaimed] = useState<NFTMetadata[]>([]);

  useEffect(() => {
    if (nftDrop) {
      nftDropClaim?.getAllClaimed()
        .then((claimed) => {
          setClaimed(claimed);
        }
        )
      nftDrop
        .getAll()
        .then((token) => {
          setToken(token);
        })
        .catch((error) => {
          console.error("failed to fetch nfts", error);
        });
    }
  }, [nftDrop]);

  useEffect(() => {
    // If they don't have an connected wallet, exit!
    if (!address) {
      return;
    }

    const checkBalance = async () => {
      try {
        const nfts = await nftDropClaim.getOwned(address);
        setHasClaimedNFT(nfts?.length > 0);
      } catch (error) {
        setHasClaimedNFT(false);
        console.error("Failed to get NFTs", error);
      }
    };
    checkBalance();
  }, [address, nftDropClaim]);

  const mintClaimNft = async () => {
    try {
      setIsClaiming(true);
      await nftDropClaim.claim(1);
      setHasClaimedNFT(true);
    } catch (error) {
      setHasClaimedNFT(false);
      console.error("Failed to mint NFT", error);
    } finally {
      setIsClaiming(false);
    }
  };

  const mintNft = async () => {
    if (claimed.length === 20) {
      await fetch("/api/condition", {
        method: "POST",
      });
    };
    nftDrop?.claim(1)
  };

  if (!address) {
    return <div className={styles.mintnft}><button className={styles.mintnftbutton} onClick={connectWithMetamask}>Connect with Metamask</button></div>;
  }

  console.log(claimed.length)

  return (

    <div className={styles.body}>

      {/* check if user has an access nft if not allow the user to mint an access nft */}

      {
        !hasClaimedNFT ? (
          <div className={styles.mintnft}>
            <button className={styles.mintnftbutton} disabled={isClaiming} onClick={mintClaimNft}>Mint NFT</button>
          </div>
        ) : (
          // if user has nft load page
          <div>
            <div className={styles.myheader}>
              <p>Welcome: {address}</p>
              <button className={styles.mintnftbutton} onClick={disconnectWallet}>Disconnect Wallet</button>
            </div>
            {/* big image and titel */}
            <div className={styles.hero}>
              <Image className={styles.hero_image}
                src={pok}
                alt="Picture of the author"
                width="700px"
                height="500px"
              />
              <div>
                <p className={styles.hero_text}>Claim Phase one has started</p>
              </div>
            </div>

            {/* mint nft button */}
            <div className={styles.nfts}>
              <button className={styles.mintnftbutton} onClick={mintNft}>click here</button>
            </div>

          </div>

        )}

    </div>
  );
};

export default Home;
